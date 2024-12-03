const bcrypt = require("bcryptjs");
const { User } = require("../../domain/entities/User");
const { HttpException } = require("../../presentation/errors/httpException");

class AuthService {
    /**
     * @param {Repositories.IUserRepository} userRepository
     * @param {Services.JWTService} jwtService
     */
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    /**
     * Генерує хеш пароля.
     * @param {string} password
     * @returns {Promise<string>}
     */
    async generatePasswordHash(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Перевіряє пароль і авторизує користувача.
     * @param {Entities.User} user
     */
    async #authorizeUser(user) {
        const sessionId = require("crypto").randomBytes(6).toString("hex");

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken({
                isPrivileged: user.isPrivileged,
                userId: user.id,
                sessionId,
            }),
            this.jwtService.generateRefreshToken({
                userId: user.id,
                sessionId,
            }),
        ]);

        return { accessToken, refreshToken, user };
    }

    /**
     * Аутентифікує користувача за логіном і паролем.
     * @param {string} username
     * @param {string} password
     */
    async authenticateUser(username, password) {
        const user = await this.userRepository.getByUsername(username);
        if (!user) throw new HttpException(404, "User not found");

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new HttpException(401, "Invalid credentials");

        user.passwordHash = null;

        return user;
    }

    async register(user) {
        const { password } = user;

        const newUser = new User({
            username: user.username,
            passwordHash: await this.generatePasswordHash(password),
        });

        await this.userRepository.save(newUser);
    }

    async login(username, password) {
        const user = await this.authenticateUser(username, password);
        if (!user) return null;

        return this.#authorizeUser(user);
    }

    /**
     * Перевіряє валідність access токена.
     * @param {string} token - access token
     */
    async checkAccess(token) {
        console.log("before check access");
        console.log(token);
        const payload = this.jwtService.verifyAccessToken(token);
        console.log(payload);
        if (!payload) throw new HttpException(401, "Invalid access token");

        return {
            userId: payload.userId,
            sessionId: payload.sessionId,
            isPrivileged: payload.isPrivileged,
        };
    }

    /**
     * Оновлює пару токенів (access та refresh).
     * @param {string} token
     */
    async refreshTokensPair(token) {
        const payload = /** @type {Services.ISessionTokenPayload | null} */ (
            this.jwtService.verifyRefreshToken(token)
        );

        if (!payload) throw new Error("Invalid refresh token");

        const user = await this.userRepository.getById(payload.userId);

        user.passwordHash = null;

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken({
                isPrivileged: user.isPrivileged,
                sessionId: payload.sessionId,
                userId: user.id,
            }),
            this.jwtService.generateRefreshToken(
                {
                    sessionId: payload.sessionId,
                    userId: user.id,
                },
                payload.exp
            ),
        ]);

        return { accessToken, refreshToken, user };
    }
}

module.exports = { AuthService };

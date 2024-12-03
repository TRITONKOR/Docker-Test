const { HttpException } = require("../../../presentation/errors/httpException");

class SignUpAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IUserRepository} dependencies.userRepository
     * @param {Services.IAuthService} dependencies.authService
     */
    constructor({ userRepository, authService }) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute(username, password) {
        if (!username || !password) {
            throw new HttpException(401, "Invalid credentials are provided");
        }

        if (await this.userRepository.getByUsername(username)) {
            throw new HttpException(400, "User already exists");
        }

        try {
            await this.authService.register({ username, password });
        } catch (error) {
            throw new HttpException(400, error.message);
        }
    }
}

module.exports = { SignUpAction };

const { HttpException } = require("../../../presentation/errors/httpException");

class SignInAction {
    /**
     * @param {Object} dependencies
     * @param {Services.IAuthService} dependencies.authService
     */
    constructor({ authService }) {
        this.authService = authService;
    }

    async execute(username, password) {
        if (!username || !password) {
            throw new HttpException(401, "Invalid credentials are provided");
        }

        try {
            const { accessToken, refreshToken, user } =
                await this.authService.login(username, password);

            return { accessToken, refreshToken, user };
        } catch (error) {
            throw new HttpException(401, error.message);
        }
    }
}

module.exports = { SignInAction };

const { HttpException } = require("../../../presentation/errors/httpException");

class RefreshAuthAction {
    /**
     * @param {Object} dependencies
     * @param {Services.IAuthService} dependencies.authService
     */
    constructor({ authService }) {
        this.authService = authService;
    }

    async execute(refreshToken, _sessionData) {
        if (!refreshToken) {
            throw new HttpException(401, "Invalid token are provided");
        }

        try {
            const sessionData = await this.authService.refreshTokensPair(
                refreshToken
            );

            return sessionData;
        } catch (error) {
            throw new HttpException(401, error);
        }
    }
}

module.exports = { RefreshAuthAction };

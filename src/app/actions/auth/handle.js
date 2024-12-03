const { HttpException } = require("../../../presentation/errors/httpException");

class HandleAuthAction {
    /**
     * @param {Object} dependencies
     * @param {Services.IAuthService} dependencies.authService
     */
    constructor({ authService }) {
        this.authService = authService;
    }

    async execute(accessToken) {
        if (!accessToken) return null;

        try {
            const accessData = await this.authService.checkAccess(accessToken);

            return accessData;
        } catch (error) {
            throw new HttpException(401, error.message);
        }
    }
}

module.exports = { HandleAuthAction };

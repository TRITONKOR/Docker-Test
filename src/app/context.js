const { AuthService } = require("./../domain/services/auth.service");
const { jwtService } = require("./../domain/services/jwt.service");

const repositories = {
    ...require("./../infra/repositories/mongo/user.repo"),
    ...require("./../infra/repositories/mongo/hero.repo"),
    ...require("./../infra/repositories/mongo/team.repo"),
    ...require("./../infra/repositories/mongo/quest.repo"),
};

const services = {
    jwtService,
    authService: new AuthService(repositories.userRepository, jwtService),
};

const domainContext = /** @const */ {
    ...repositories,
    ...services,
};

module.exports.domainContext = Object.freeze(
    Object.assign(Object.create(null), domainContext)
);

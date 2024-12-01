const repositories = {
    ...require("./../infra/repositories/mongo/hero.repo"),
    ...require("./../infra/repositories/mongo/team.repo"),
    ...require("./../infra/repositories/mongo/quest.repo"),
};

const domainContext = /** @const */ {
    ...repositories,
};

module.exports.domainContext = Object.freeze(
    Object.assign(Object.create(null), domainContext)
);

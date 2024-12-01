module.exports.patchContext = (fastify) => {
    fastify.decorate(
        "domainContext",
        require("../../app/context").domainContext
    );
};

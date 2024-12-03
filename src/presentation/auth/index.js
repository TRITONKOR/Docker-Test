const { authPipeFactory } = require("./auth.pipe");
const { authGuardFactory } = require("./auth.guard");

module.exports.pathAuth = async function (fastify) {
    fastify
        .decorate("authPipeFactory", authPipeFactory)
        .decorate("authGuardFactory", authGuardFactory);
};

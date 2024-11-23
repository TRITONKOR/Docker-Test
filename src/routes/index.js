const { echoRoute } = require("./echo");
const { heroesPostgresRouter } = require("./postgres/heroes");
const { heroesMongoRouter } = require("./mongo/heroes");

/**
 * Patch the routing of the Fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchRouting = (fastify) => {
    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404).send({ error: "Not Found" });
    });

    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error);

        const statusCode = error.statusCode || 500;

        if (error.validation) {
            return reply.status(statusCode).send({
                error: "Invalid request",
                message: error.message,
            });
        }

        reply.status(statusCode).send({ error: "Internal Server Error" });
    });

    registerRoutes(fastify);
};

/**
 * Registers all application routes
 * @param {import("fastify").FastifyInstance} fastify
 */
const registerRoutes = (fastify) => {
    fastify.register(echoRoute);
    fastify.register(heroesPostgresRouter);
    fastify.register(heroesMongoRouter);
};

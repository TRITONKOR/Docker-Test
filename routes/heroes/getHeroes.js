const { heroRepository } = require("../../repositories/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHeroes: {
        url: "/heroes",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const list = await heroRepository.read();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch heroes" });
            }
        },
    },
};

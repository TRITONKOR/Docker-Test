const {
    heroRepository,
} = require("../../../infra/repositories/postgres/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHero: {
        url: "/pg/heroes/:id",
        method: "GET",
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
        },
        handler: async (request, reply) => {
            try {
                const targetId = request.params.id;
                const found = await heroRepository.read(targetId);
                if (!found) {
                    return reply.code(404).send({
                        message: "Hero not found",
                    });
                }
                return reply.code(200).send(found);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch hero" });
            }
        },
    },
};

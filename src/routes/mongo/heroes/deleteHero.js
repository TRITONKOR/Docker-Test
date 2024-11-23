const {
    heroRepository,
} = require("../../../infra/repositories/mongo/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteHero: {
        url: "/mongo/heroes/:id",
        method: "DELETE",
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
                const deleted = await heroRepository.delete(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete hero" });
            }
        },
    },
};

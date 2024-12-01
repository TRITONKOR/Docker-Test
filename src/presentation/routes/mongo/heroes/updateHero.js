const { UpdateHeroAction } = require("../../../../app/actions/hero/UpdateHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateHero: {
        url: "/mongo/heroes/:id",
        method: "PUT",
        bodyLimit: 1024,
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
            body: {
                type: "object",
                required: ["name", "superpower"],
                properties: {
                    name: { type: "string" },
                    superpower: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const updateHero = new UpdateHeroAction(
                    request.server.domainContext
                );
                const targetId = request.params.id;
                const { name, superpower } = request.body;
                const updated = await updateHero.execute(targetId, {
                    name,
                    superpower,
                });
                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to update hero" });
            }
        },
    },
};

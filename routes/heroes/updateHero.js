const { heroRepository } = require("../../repositories/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateHero: {
        url: "/heroes/:id",
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
                required: ["name", "class"],
                properties: {
                    name: { type: "string" },
                    class: { type: "string" },
                    level: { type: "number" },
                    health: { type: "number" },
                    mana: { type: "number" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const targetId = request.params.id;
                const { name, class: heroClass, level = 1, health = 100, mana = 50 } = request.body;
                const updated = await heroRepository.update(targetId, {
                    name,
                    class: heroClass,
                    level,
                    health,
                    mana,
                });
                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to update hero" });
            }
        },
    },
};

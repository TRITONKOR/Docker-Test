const { UpdateHeroAction } = require("../../../../app/actions/hero/UpdateHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateHero: {
        url: "/mongo/heroes/:id",
        method: "PUT",
        bodyLimit: 1024,
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
        schema: {
            description: "Оновити інформацію про героя",
            tags: ["Heroes"],
            summary: "Оновити героя за його ID",
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "ID героя, якого потрібно оновити",
                    },
                },
                required: ["id"],
            },
            body: {
                type: "object",
                required: ["name", "superpower"],
                properties: {
                    name: { type: "string", description: "Ім'я героя" },
                    superpower: {
                        type: "string",
                        description: "Суперсила героя",
                    },
                },
            },
            response: {
                200: {
                    description: "Успішно оновлено героя",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID оновленого героя",
                        },
                        name: {
                            type: "string",
                            description: "Оновлене ім'я героя",
                        },
                        superpower: {
                            type: "string",
                            description: "Оновлена суперсила героя",
                        },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
            },
        },
    },
};

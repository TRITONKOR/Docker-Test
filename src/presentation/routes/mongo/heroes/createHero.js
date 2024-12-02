const { CreateHeroAction } = require("../../../../app/actions/hero/createHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createHero: {
        url: "/mongo/heroes",
        method: "POST",
        bodyLimit: 1024,
        handler: async (request, reply) => {
            try {
                const createHero = new CreateHeroAction(
                    request.server.domainContext
                );
                const heroData = request.body;
                const hero = await createHero.execute(heroData);
                return reply.code(201).send(hero);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Не вдалося створити героя" });
            }
        },
        schema: {
            description: "Створення нового героя",
            tags: ["Heroes"],
            summary: "Додати нового героя",
            body: {
                type: "object",
                required: ["name", "superpower"],
                properties: {
                    name: {
                        type: "string",
                        description: "Ім'я героя",
                    },
                    superpower: {
                        type: "string",
                        description: "Суперздатність героя",
                    },
                },
            },
            response: {
                201: {
                    description: "Героя створено успішно",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Унікальний ідентифікатор героя",
                        },
                        name: { type: "string", description: "Ім'я героя" },
                        superpower: {
                            type: "string",
                            description: "Суперздатність героя",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Дата та час створення",
                        },
                    },
                },
                400: {
                    description: "Помилка валідації вхідних даних",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                        },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
};

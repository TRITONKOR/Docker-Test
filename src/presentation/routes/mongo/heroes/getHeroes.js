const { ListHeroesAction } = require("../../../../app/actions/hero/ListHeroes");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHeroes: {
        url: "/mongo/heroes",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const listHeroes = new ListHeroesAction(
                    request.server.domainContext
                );
                const list = await listHeroes.execute();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Failed to fetch heroes" });
            }
        },
        schema: {
            description: "Отримати список всіх героїв",
            tags: ["Heroes"],
            summary: "Отримати список героїв",
            response: {
                200: {
                    description: "Успішно отримано список героїв",
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string", description: "ID героя" },
                            name: { type: "string", description: "Ім'я героя" },
                            superpower: {
                                type: "string",
                                description: "Суперсила героя",
                            },
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

const { ListHeroesAction } = require("../../../../app/actions/hero/ListHeroes");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHeroes: {
        url: "/mongo/heroes",
        method: "GET",
        handler: async (request, reply) => {
            const { term, limit, page, sort } = request.query;

            const offset = limit * (page - 1);

            const listHeroes = new ListHeroesAction(
                request.server.domainContext
            );

            const heroes = await listHeroes.execute({
                term,
                sort,
                limit,
                offset,
            });

            return reply.code(200).send(heroes);
        },
        schema: {
            description: "Отримати список всіх героїв",
            tags: ["Heroes"],
            summary: "Отримати список героїв",
            querystring: {
                type: "object",
                properties: {
                    term: { type: "string" },
                    limit: {
                        type: "integer",
                        minimum: 1,
                        maximum: 100,
                        default: 10,
                    },
                    page: { type: "integer", minimum: 1, default: 1 },
                    sort: {
                        type: "string",
                        enum: ["name", "superpower", "releaseDate"],
                    },
                },
            },
            response: {
                200: {
                    description: "Успішно отримано список героїв",
                    type: "object",
                    properties: {
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        description: "ID героя",
                                    },
                                    name: {
                                        type: "string",
                                        description: "Ім'я героя",
                                    },
                                    superpower: {
                                        type: "string",
                                        description: "Суперсила героя",
                                    },
                                },
                            },
                        },
                        page: {
                            type: "integer",
                            description: "Номер поточної сторінки",
                        },
                        total: {
                            type: "integer",
                            description: "Загальна кількість героїв",
                        },
                    },
                },
            },
        },
    },
};

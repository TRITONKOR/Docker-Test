const { GetHeroAction } = require("../../../../app/actions/hero/GetHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHero: {
        url: "/mongo/heroes/:id",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const getHero = new GetHeroAction(request.server.domainContext);
                const targetId = request.params.id;
                const hero = await getHero.execute(targetId);
                if (!hero) {
                    return reply.code(404).send({
                        message: "Hero not found",
                    });
                }
                return reply.code(200).send(hero);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch hero" });
            }
        },
        schema: {
            description: "Отримати героя за його ID",
            tags: ["Heroes"],
            summary: "Отримати героя",
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "string",
                        description:
                            "Унікальний ідентифікатор героя, який буде отримано",
                    },
                },
            },
            response: {
                200: {
                    description: "Дані героя успішно отримано",
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
                404: {
                    description: "Героя не знайдено",
                    type: "object",
                    properties: {
                        message: { type: "string" },
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

const { AddHeroAction } = require("../../../../app/actions/team/AddHero");

module.exports.addHeroToTeam = {
    url: "/mongo/teams/:teamId/heroes/:heroId",
    method: "POST",
    handler: async (request, reply) => {
        try {
            const { teamId, heroId } = request.params;
            console.log(request.server.domainContext);

            const addHeroAction = new AddHeroAction(
                request.server.domainContext
            );

            const updatedTeam = await addHeroAction.execute(heroId, teamId);

            return reply.code(200).send(updatedTeam);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to add hero to team" });
        }
    },
    schema: {
        description: "Додає героя до команди за їхніми ID",
        tags: ["Teams", "Heroes"],
        summary: "Маршрут для додавання героя до команди",
        params: {
            type: "object",
            required: ["teamId", "heroId"],
            properties: {
                teamId: {
                    type: "string",
                    description: "ID команди, до якої потрібно додати героя",
                },
                heroId: {
                    type: "string",
                    description: "ID героя, якого потрібно додати до команди",
                },
            },
        },
        response: {
            200: {
                description: "Команду оновлено з доданим героєм",
                type: "object",
                properties: {
                    id: { type: "string", description: "ID оновленої команди" },
                    name: {
                        type: "string",
                        description: "Назва оновленої команди",
                    },
                    heroes: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                heroId: {
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
                        description: "Список героїв у команді",
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
};

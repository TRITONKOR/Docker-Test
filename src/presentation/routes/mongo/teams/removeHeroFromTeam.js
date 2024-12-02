const { RemoveHeroAction } = require("../../../../app/actions/team/RemoveHero");

module.exports.removeHeroFromTeam = {
    url: "/mongo/teams/:teamId/heroes/:heroId",
    method: "DELETE",
    handler: async (request, reply) => {
        try {
            const { teamId, heroId } = request.params;
            console.log(request.server.domainContext);

            const removeHeroAction = new RemoveHeroAction(
                request.server.domainContext
            );

            const updatedTeam = await removeHeroAction.execute(heroId, teamId);

            return reply.code(200).send(updatedTeam);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to remove hero from team" });
        }
    },
    schema: {
        description: "Видаляє героя з команди за їхніми ID",
        tags: ["Teams", "Heroes"],
        summary: "Маршрут для видалення героя з команди",
        params: {
            type: "object",
            properties: {
                teamId: {
                    type: "string",
                    description: "ID команди, з якої потрібно видалити героя",
                },
                heroId: {
                    type: "string",
                    description: "ID героя, якого потрібно видалити з команди",
                },
            },
            required: ["teamId", "heroId"],
        },
        response: {
            200: {
                description: "Герой успішно видалений з команди",
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Повідомлення про успішне видалення героя",
                    },
                    team: {
                        type: "object",
                        description:
                            "Оновлена інформація про команду після видалення героя",
                        properties: {
                            id: { type: "string" },
                            title: { type: "string" },
                            description: { type: "string" },
                            heroes: {
                                type: "array",
                                items: { type: "string" },
                                description:
                                    "Список ID героїв в команді після видалення",
                            },
                        },
                    },
                },
            },
            500: {
                description: "Внутрішня помилка сервера",
                type: "object",
                properties: {
                    error: {
                        type: "string",
                        description: "Повідомлення про помилку",
                    },
                },
            },
        },
    },
};

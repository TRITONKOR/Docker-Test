const {
    AssignQuestAction,
} = require("../../../../app/actions/team/AssignQuest");

module.exports.assignQuest = {
    url: "/mongo/teams/:teamId/assign/:questId",
    method: "POST",
    handler: async (request, reply) => {
        try {
            const { questId, teamId } = request.params;

            const assignQuest = new AssignQuestAction(
                request.server.domainContext
            );

            const updatedTeam = await assignQuest.execute(questId, teamId);

            return reply.code(200).send(updatedTeam);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to assign quest to the team" });
        }
    },
    schema: {
        description: "Призначає квест команді за їхніми ID",
        tags: ["Teams", "Quests"],
        summary: "Маршрут для призначення квесту команді",
        params: {
            type: "object",
            required: ["teamId", "questId"],
            properties: {
                teamId: {
                    type: "string",
                    description:
                        "ID команди, до якої потрібно призначити квест",
                },
                questId: {
                    type: "string",
                    description: "ID квесту, який потрібно призначити команді",
                },
            },
        },
        response: {
            200: {
                description: "Команду оновлено з призначеним квестом",
                type: "object",
                properties: {
                    id: { type: "string", description: "ID оновленої команди" },
                    name: {
                        type: "string",
                        description: "Назва оновленої команди",
                    },
                    quests: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                questId: {
                                    type: "string",
                                    description: "ID квесту",
                                },
                                title: {
                                    type: "string",
                                    description: "Назва квесту",
                                },
                                description: {
                                    type: "string",
                                    description: "Опис квесту",
                                },
                            },
                        },
                        description: "Список квестів, призначених команді",
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

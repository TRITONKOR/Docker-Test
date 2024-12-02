const {
    CompleteQuestAction,
} = require("../../../../app/actions/quest/CompleteQuest");

module.exports.completeQuest = {
    url: "/mongo/quests/:questId/complete",
    method: "POST",
    handler: async (request, reply) => {
        try {
            const { questId } = request.params;

            const completeQuestAction = new CompleteQuestAction(
                request.server.domainContext
            );

            const updatedQuest = await completeQuestAction.execute(questId);

            return reply.code(200).send(updatedQuest);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to complete the quest" });
        }
    },
    schema: {
        description: "Завершити квест за його ID",
        tags: ["Quests"],
        summary: "Маршрут для завершення квесту",
        params: {
            type: "object",
            required: ["questId"],
            properties: {
                questId: {
                    type: "string",
                    description: "ID квесту, який потрібно завершити",
                },
            },
        },
        response: {
            200: {
                description: "Квест успішно завершено",
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "ID завершеного квесту",
                    },
                    title: {
                        type: "string",
                        description: "Назва завершеного квесту",
                    },
                    description: {
                        type: "string",
                        description: "Опис завершеного квесту",
                    },
                    completed: {
                        type: "boolean",
                        description: "Статус завершення квесту",
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

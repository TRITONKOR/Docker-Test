const {
    UpdateQuestAction,
} = require("../../../../app/actions/quest/UpdateQuest");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateQuest: {
        url: "/mongo/quests/:id",
        method: "PUT",
        bodyLimit: 1024,
        handler: async (request, reply) => {
            try {
                const updateQuest = new UpdateQuestAction(
                    request.server.domainContext
                );
                const targetId = request.params.id;
                const { title, description } = request.body;
                const updated = await updateQuest.execute(targetId, {
                    title,
                    description,
                });
                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Failed to update quest" });
            }
        },
        schema: {
            description: "Оновити квест за його ID",
            tags: ["Quests"],
            summary: "Оновлення даних квесту",
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "string",
                        description: "ID квесту, який потрібно оновити",
                    },
                },
            },
            body: {
                type: "object",
                required: ["title", "description"],
                properties: {
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
            response: {
                200: {
                    description: "Квест успішно оновлено",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID оновленого квесту",
                        },
                        title: {
                            type: "string",
                            description: "Оновлена назва квесту",
                        },
                        description: {
                            type: "string",
                            description: "Оновлений опис квесту",
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

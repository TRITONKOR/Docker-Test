const {
    DeleteQuestAction,
} = require("../../../../app/actions/quest/DeleteQuest");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteQuest: {
        url: "/mongo/quests/:id",
        method: "DELETE",
        handler: async (request, reply) => {
            try {
                const deleteQuest = new DeleteQuestAction(
                    request.server.domainContext
                );
                const targetId = request.params.id;
                const deleted = await deleteQuest.execute(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Failed to delete quest" });
            }
        },
        schema: {
            description: "Видалити квест за його ID",
            tags: ["Quests"],
            summary: "Видалення квесту за наданим ID",
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "string",
                        description: "ID квесту, який потрібно видалити",
                    },
                },
            },
            response: {
                200: {
                    description: "Квест успішно видалено",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID видаленого квесту",
                        },
                        message: {
                            type: "string",
                            description: "Повідомлення про успішне видалення",
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

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
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
        },
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
    },
};

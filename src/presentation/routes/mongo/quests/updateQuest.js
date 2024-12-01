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
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
            body: {
                type: "object",
                required: ["title", "description"],
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                },
            },
        },
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
    },
};

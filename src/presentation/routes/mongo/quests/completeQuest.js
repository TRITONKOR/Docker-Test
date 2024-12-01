const {
    CompleteQuestAction,
} = require("../../../../app/actions/quest/CompleteQuest");

module.exports.completeQuest = {
    url: "/mongo/quests/:questId/complete",
    method: "POST",
    schema: {
        params: {
            type: "object",
            properties: {
                questId: { type: "string" },
            },
            required: ["questId"],
        },
    },
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
};

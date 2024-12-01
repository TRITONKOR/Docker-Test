const {
    AssignQuestAction,
} = require("../../../../app/actions/team/AssignQuest");

module.exports.assignQuest = {
    url: "/mongo/teams/:teamId/assign/:questId",
    method: "POST",
    schema: {
        params: {
            type: "object",
            properties: {
                teamId: { type: "string" },
                questId: { type: "string" },
            },
            required: ["teamId", "questId"],
        },
    },
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
};

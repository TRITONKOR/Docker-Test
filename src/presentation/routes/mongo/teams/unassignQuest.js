const {
    UnassignQuestAction,
} = require("../../../../app/actions/team/UnassignQuest");

module.exports.unassignQuest = {
    url: "/mongo/teams/:teamId/unassign/:questId",
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

            const unassignQuest = new UnassignQuestAction(
                request.server.domainContext
            );

            const updatedTeam = await unassignQuest.execute(questId, teamId);

            return reply.code(200).send(updatedTeam);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to unassign quest to the team" });
        }
    },
};

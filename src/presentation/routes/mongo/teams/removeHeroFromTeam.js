const { RemoveHeroAction } = require("../../../../app/actions/team/RemoveHero");

module.exports.removeHeroFromTeam = {
    url: "/mongo/teams/:teamId/heroes/:heroId",
    method: "DELETE",
    schema: {
        params: {
            type: "object",
            properties: {
                teamId: { type: "string" },
                heroId: { type: "string" },
            },
            required: ["teamId", "heroId"],
        },
    },
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
};

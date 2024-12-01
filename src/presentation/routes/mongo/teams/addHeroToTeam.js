const { AddHeroAction } = require("../../../../app/actions/team/AddHero");

module.exports.addHeroToTeam = {
    url: "/mongo/teams/:teamId/heroes/:heroId",
    method: "POST",
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

            const addHeroAction = new AddHeroAction(
                request.server.domainContext
            );

            const updatedTeam = await addHeroAction.execute(heroId, teamId);

            return reply.code(200).send(updatedTeam);
        } catch (error) {
            request.log.error(error);
            return reply
                .code(500)
                .send({ error: "Failed to add hero to team" });
        }
    },
};

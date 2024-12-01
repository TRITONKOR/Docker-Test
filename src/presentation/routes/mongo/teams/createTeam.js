const { CreateTeamAction } = require("../../../../app/actions/team/CreateTeam");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createTeam: {
        url: "/mongo/teams",
        method: "POST",
        bodyLimit: 1024,
        schema: {
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
                const createTeam = new CreateTeamAction(
                    request.server.domainContext
                );
                const teamData = request.body;
                const team = await createTeam.execute(teamData);
                return reply.code(201).send(team);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Не вдалося створити команду" });
            }
        },
    },
};

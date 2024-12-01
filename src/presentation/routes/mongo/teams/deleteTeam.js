const { DeleteTeamAction } = require("../../../../app/actions/team/DeleteTeam");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteTeam: {
        url: "/mongo/teams/:id",
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
                const deleteTeam = new DeleteTeamAction(
                    request.server.domainContext
                );
                const targetId = request.params.id;
                const deleted = await deleteTeam.execute(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete team" });
            }
        },
    },
};

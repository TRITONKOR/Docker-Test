const { DeleteTeamAction } = require("../../../../app/actions/team/DeleteTeam");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteTeam: {
        url: "/mongo/teams/:id",
        method: "DELETE",
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
        schema: {
            description: "Видаляє команду за її ID",
            tags: ["Teams"],
            summary: "Маршрут для видалення команди",
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "ID команди, яку потрібно видалити",
                    },
                },
                required: ["id"],
            },
            response: {
                200: {
                    description: "Команда успішно видалена",
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Повідомлення про успішне видалення",
                        },
                        id: {
                            type: "string",
                            description: "ID видаленої команди",
                        },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            description: "Повідомлення про помилку",
                        },
                    },
                },
            },
        },
    },
};

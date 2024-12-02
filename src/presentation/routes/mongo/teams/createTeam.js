const { CreateTeamAction } = require("../../../../app/actions/team/CreateTeam");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createTeam: {
        url: "/mongo/teams",
        method: "POST",
        bodyLimit: 1024,
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
        schema: {
            description: "Створює нову команду",
            tags: ["Teams"],
            summary: "Маршрут для створення нової команди",
            body: {
                type: "object",
                required: ["title", "description"],
                properties: {
                    title: {
                        type: "string",
                        description: "Назва команди",
                    },
                    description: {
                        type: "string",
                        description: "Опис команди",
                    },
                },
            },
            response: {
                201: {
                    description: "Команда успішно створена",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID новоствореної команди",
                        },
                        title: {
                            type: "string",
                            description: "Назва нової команди",
                        },
                        description: {
                            type: "string",
                            description: "Опис нової команди",
                        },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            description: "Помилка сервера",
                        },
                    },
                },
            },
        },
    },
};

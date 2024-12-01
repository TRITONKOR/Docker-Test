const {
    CreateQuestAction,
} = require("../../../../app/actions/quest/CreateQuest");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createQuest: {
        url: "/mongo/quests",
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
                const createQuest = new CreateQuestAction(
                    request.server.domainContext
                );
                const questData = request.body;
                const quest = await createQuest.execute(questData);
                return reply.code(201).send(quest);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Не вдалося створити квест" });
            }
        },
    },
};

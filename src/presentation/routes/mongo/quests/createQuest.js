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
        schema: {
            description: "Створити новий квест",
            tags: ["Quests"],
            summary: "Створення нового квесту з наданими параметрами",
            body: {
                type: "object",
                required: ["title", "description"],
                properties: {
                    title: {
                        type: "string",
                        description: "Назва квесту",
                    },
                    description: {
                        type: "string",
                        description: "Опис квесту",
                    },
                },
            },
            response: {
                201: {
                    description: "Квест успішно створено",
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID створеного квесту",
                        },
                        title: { type: "string", description: "Назва квесту" },
                        description: {
                            type: "string",
                            description: "Опис квесту",
                        },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
            },
        },
    },
};

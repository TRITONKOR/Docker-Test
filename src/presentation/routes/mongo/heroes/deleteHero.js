const { DeleteHeroAction } = require("../../../../app/actions/hero/DeleteHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteHero: {
        url: "/mongo/heroes/:id",
        method: "DELETE",
        handler: async (request, reply) => {
            try {
                const deleteHero = new DeleteHeroAction(
                    request.server.domainContext
                );
                const targetId = request.params.id;
                const deleted = await deleteHero.execute(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete hero" });
            }
        },
        schema: {
            description: "Видалення героя за його ID",
            tags: ["Heroes"],
            summary: "Видалити героя",
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: {
                        type: "string",
                        description:
                            "Унікальний ідентифікатор героя для видалення",
                    },
                },
            },
            response: {
                200: {
                    description: "Героя успішно видалено",
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        message: {
                            type: "string",
                        },
                    },
                },
                400: {
                    description: "Помилка у запиті",
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
                404: {
                    description: "Героя не знайдено",
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
                500: {
                    description: "Внутрішня помилка сервера",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
};

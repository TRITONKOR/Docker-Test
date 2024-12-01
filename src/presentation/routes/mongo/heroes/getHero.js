const { GetHeroAction } = require("../../../../app/actions/hero/GetHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHero: {
        url: "/mongo/heroes/:id",
        method: "GET",
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
                const getHero = new GetHeroAction(request.server.domainContext);
                const targetId = request.params.id;
                const hero = await getHero.execute(targetId);
                if (!hero) {
                    return reply.code(404).send({
                        message: "Hero not found",
                    });
                }
                return reply.code(200).send(hero);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch hero" });
            }
        },
    },
};

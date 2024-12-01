const { CreateHeroAction } = require("../../../../app/actions/hero/createHero");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createHero: {
        url: "/mongo/heroes",
        method: "POST",
        bodyLimit: 1024,
        schema: {
            body: {
                type: "object",
                required: ["name", "superpower"],
                properties: {
                    name: { type: "string" },
                    superpower: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const createHero = new CreateHeroAction(
                    request.server.domainContext
                );
                const heroData = request.body;
                const hero = await createHero.execute(heroData);
                return reply.code(201).send(hero);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Не вдалося створити героя" });
            }
        },
    },
};

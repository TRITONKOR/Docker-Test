const {
    heroRepository,
} = require("../../../infra/repositories/postgres/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createHero: {
        url: "/pg/heroes",
        method: "POST",
        bodyLimit: 1024,
        schema: {
            body: {
                type: "object",
                required: ["name", "class", "level"],
                properties: {
                    name: { type: "string" },
                    class: { type: "string" },
                    level: { type: "number" },
                    health: { type: "number" },
                    mana: { type: "number" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const heroData = request.body;
                const hero = await heroRepository.create(heroData);
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

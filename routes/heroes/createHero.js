const { heroRepository } = require("../../repositories/hero.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createHero: {
        url: "/heroes",
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
                const { name, class: heroClass, level, health = 100, mana = 100 } = request.body;

                const hero = await heroRepository.create({
                    name,
                    class: heroClass,
                    level,
                    health,
                    mana,
                });

                return reply.code(201).send(hero);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to create hero" });
            }
        },
    },
};

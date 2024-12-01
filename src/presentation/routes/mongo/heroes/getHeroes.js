const { ListHeroesAction } = require("../../../../app/actions/hero/ListHeroes");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getHeroes: {
        url: "/mongo/heroes",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const listHeroes = new ListHeroesAction(
                    request.server.domainContext
                );
                const list = await listHeroes.execute();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply
                    .code(500)
                    .send({ error: "Failed to fetch heroes" });
            }
        },
    },
};

const { getHero } = require("./getHero");
const { getHeroes } = require("./getHeroes");
const { createHero } = require("./createHero");
const { updateHero } = require("./updateHero");
const { deleteHero } = require("./deleteHero");

module.exports.heroesRouter = async function (fastify, opts) {
    fastify.route(createHero);
    fastify.route(getHeroes);
    fastify.route(getHero);
    fastify.route(updateHero);
    fastify.route(deleteHero);
};

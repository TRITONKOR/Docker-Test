const { createQuest } = require("./createQuest");
const { deleteQuest } = require("./deleteQuest");
const { updateQuest } = require("./updateQuest");
const { completeQuest } = require("./completeQuest");
//const { addHeroToTeam } = require("./addHeroToTeam");
//const { removeHeroFromTeam } = require("./removeHeroFromTeam");

module.exports.questsMongoRouter = async function (fastify, opts) {
    fastify.route(createQuest);
    fastify.route(deleteQuest);
    fastify.route(updateQuest);
    fastify.route(completeQuest);
    //fastify.route(addHeroToTeam);
    //fastify.route(removeHeroFromTeam);
};

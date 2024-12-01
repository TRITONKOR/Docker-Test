const { createTeam } = require("./createTeam");
const { deleteTeam } = require("./deleteTeam");
const { addHeroToTeam } = require("./addHeroToTeam");
const { removeHeroFromTeam } = require("./removeHeroFromTeam");
const { assignQuest } = require("./assignQuest");
const { unassignQuest } = require("./unassignQuest");

module.exports.teamsMongoRouter = async function (fastify, opts) {
    fastify.route(createTeam);
    fastify.route(deleteTeam);
    fastify.route(addHeroToTeam);
    fastify.route(removeHeroFromTeam);
    fastify.route(assignQuest);
    fastify.route(unassignQuest);
};

const { Team } = require("../../../domain/entities/Team");

class CreateTeamAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.ITeamRepository} dependencies.teamRepository
     */
    constructor({ teamRepository }) {
        this.teamRepository = teamRepository;
    }

    /**
     * Executes the use case to create a new hero.
     * @param {Object} teamData
     * @param {string} heroData.title
     * @param {string} heroData.description
     * @param {string} heroData.members
     * @param {string} heroData.quests
     * @returns {Promise<Entities.Team>}
     */
    async execute(teamData) {
        const { title, description } = teamData;

        // Validate input data
        if (!title || !description) {
            throw new Error("Missing required team data");
        }

        // Create new team entity
        const team = new Team({
            title,
            description,
        });

        // Save the team
        return await this.teamRepository.save(team);
    }
}

module.exports = { CreateTeamAction };

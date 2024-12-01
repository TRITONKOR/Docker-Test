class DeleteTeamAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.ITeamRepository} dependencies.teamRepository
     */
    constructor({ teamRepository }) {
        this.teamRepository = teamRepository;
    }

    /**
     * Executes the use case to delete a team by ID.
     * @param {string} teamId
     * @returns {Promise<void>}
     */
    async execute(teamId) {
        if (!teamId) {
            throw new Error("Team ID must be provided");
        }

        // Fetch the team by ID
        const team = await this.teamRepository.getById(teamId);

        if (!team) {
            throw new Error("Team not found");
        }

        // Delete the team
        await this.teamRepository.delete(teamId);
    }
}

module.exports = { DeleteTeamAction };

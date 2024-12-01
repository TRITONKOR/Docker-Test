class AssignQuestAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IQuestRepository} dependencies.questRepository
     * @param {Repositories.ITeamRepository} dependencies.teamRepository
     */
    constructor({ questRepository, teamRepository }) {
        this.questRepository = questRepository;
        this.teamRepository = teamRepository;
    }

    /**
     * Assign quest.
     * @param {string} questId
     * @param {string} teamId
     * @returns {Promise<Entities.Team>}
     */
    async execute(questId, teamId) {
        if (!questId || !teamId) {
            throw new Error("Quest ID must be provided");
        }

        const quest = await this.questRepository.getById(questId);
        const team = await this.teamRepository.getById(teamId);

        if (!quest || !team) {
            throw new Error("Quest or Team not found");
        }

        quest.assignTeam(team.id);
        team.addQuest(quest.id);

        // Update team and quest
        await this.questRepository.update(quest);
        return await this.teamRepository.update(team);
    }
}

module.exports = { AssignQuestAction };

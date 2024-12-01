class UpdateQuestAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IQuestRepository} dependencies.questRepository
     */
    constructor({ questRepository }) {
        this.questRepository = questRepository;
    }

    /**
     * Creates a new quest.
     * @param {Object} questData
     * @param {string} questData.title
     * @param {string} questData.description
     * @returns {Promise<Entities.Quest>}
     */
    async execute(questId, updateData) {
        if (!updateData) {
            throw new Error("updateData must be provided");
        }

        // Fetch the quest by ID
        const quest = await this.questRepository.getById(questId);

        if (!quest) {
            throw new Error("Quest not found");
        }

        if (updateData.title !== undefined) {
            quest.title = updateData.title;
        }

        if (updateData.description !== undefined) {
            quest.description = updateData.description;
        }

        if (updateData.status !== undefined) {
            quest.status = updateData.status;
        }

        if (updateData.assignedTeam !== undefined) {
            quest.assignedTeam = updateData.assignedTeam;
        }

        // Update quest
        return await this.questRepository.update(quest);
    }
}

module.exports = { UpdateQuestAction };

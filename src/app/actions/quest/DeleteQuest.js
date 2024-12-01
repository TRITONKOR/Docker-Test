class DeleteQuestAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IQuestRepository} dependencies.questRepository
     */
    constructor({ questRepository }) {
        this.questRepository = questRepository;
    }

    /**
     * Executes the use case to delete a quest by ID.
     * @param {string} questId
     * @returns {Promise<void>}
     */
    async execute(questId) {
        if (!questId) {
            throw new Error("Quest ID must be provided");
        }

        // Fetch the quest by ID
        const quest = await this.questRepository.getById(questId);

        if (!quest) {
            throw new Error("Quest not found");
        }

        // Delete the quest
        await this.questRepository.delete(questId);
    }
}

module.exports = { DeleteQuestAction };

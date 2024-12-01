class CompleteQuestAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IQuestRepository} dependencies.questRepository
     */
    constructor({ questRepository }) {
        this.questRepository = questRepository;
    }

    /**
     * Complete quest.
     * @param {string} questId
     * @returns {Promise<Entities.Quest>}
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

        quest.complete();

        // Update quest
        return await this.questRepository.update(quest);
    }
}

module.exports = { CompleteQuestAction };

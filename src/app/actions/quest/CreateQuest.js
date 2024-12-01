const { Quest } = require("../../../domain/entities/Quest");

class CreateQuestAction {
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
    async execute({ title, description }) {
        if (!title) {
            throw new Error("Quest title is required");
        }

        const newQuest = new Quest({
            title,
            description,
            status: "pending",
            assignedTeam: null,
        });

        return await this.questRepository.save(newQuest);
    }
}

module.exports = { CreateQuestAction };

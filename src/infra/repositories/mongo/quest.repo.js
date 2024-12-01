const { Quest } = require("../../../domain/entities/Quest");
const {
    mongoDBAdapter: { $db, asObjectId, newObjectId },
} = require("./../../database/mongo/adapter");

/**
 * @implements {Repositories.IQuestRepository}
 */
class QuestRepository {
    #collection = $db.collection("quests");

    /**
     * Fetches a quest by ID.
     * @param {string} id
     * @returns {Promise<Entities.Quest | null>}
     */
    async getById(id) {
        try {
            const quest = await this.#collection.findOne({
                _id: asObjectId(id),
            });

            if (quest) {
                const questData = {
                    id: quest._id.toString(),
                    title: quest.title,
                    description: quest.description,
                    status: quest.status,
                    assignedTeam: quest.assignedTeam
                        ? quest.assignedTeam.toString()
                        : null,
                };

                return new Quest(questData);
            }

            return null;
        } catch (error) {
            console.error("Error fetching quest by ID:", error);
            throw error;
        }
    }

    /**
     * Fetches a quest by title.
     * @param {string} title
     * @returns {Promise<Entities.User | null>}
     */
    async getByTitle(title) {
        try {
            const quest = await this.#collection.findOne({ title });

            return quest ? new Quest({ id: quest._id, ...quest }) : null;
        } catch (error) {
            console.error("Error fetching quest by title:", error);
            throw error;
        }
    }

    /**
     * Saves a new quest.
     * @param {Entities.Quest} quest
     * @returns {Promise<Entities.Quest>}
     */
    async save(quest) {
        try {
            const questData = {
                title: quest.title,
                description: quest.description,
                status: quest.status,
                assignedTeam: quest.assignedTeam,
            };

            const result = await this.#collection.insertOne(questData);

            return new Quest({
                id: result.insertedId.toString(),
                ...questData,
            });
        } catch (error) {
            console.error("Error saving quest:", error);
            throw error;
        }
    }

    /**
     * Updates an existing quest.
     * @param {Entities.Quest} quest
     * @returns {Promise<Entities.Quest>}
     */
    async update(quest) {
        try {
            const questData = {
                title: quest.title,
                description: quest.description,
                status: quest.status,
                assignedTeam: quest.assignedTeam,
            };

            await this.#collection.updateOne(
                { _id: asObjectId(quest.id) },
                { $set: questData }
            );

            return new Quest({ ...quest, ...questData });
        } catch (error) {
            console.error("Error updating quest:", error);
            throw error;
        }
    }

    /**
     * Deletes a quest by ID.
     * @param {string} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        try {
            await this.#collection.deleteOne({
                _id: asObjectId(id),
            });
        } catch (error) {
            console.error("Error deleting quest:", error);
            throw error;
        }
    }
}

module.exports = {
    questRepository: new QuestRepository(),
};

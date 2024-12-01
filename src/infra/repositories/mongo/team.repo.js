const { Team } = require("../../../domain/entities/Team");
const {
    mongoDBAdapter: { $db, asObjectId },
} = require("./../../database/mongo/adapter");

/**
 * @implements {Repositories.ITeamRepository}
 */
class TeamRepository {
    #collection = $db.collection("teams");

    /**
     * Fetches a team by ID.
     * @param {string} id
     * @returns {Promise<Entities.Team | null>}
     */
    async getById(id) {
        try {
            const team = await this.#collection.findOne({
                _id: asObjectId(id),
            });

            if (team) {
                // Конвертуємо ID команди та героїв у рядки перед передачею
                const teamData = {
                    id: team._id.toString(), // перетворення ObjectId в строку
                    title: team.title,
                    description: team.description,
                    members: team.members.map((memberId) =>
                        memberId.toString()
                    ), // перетворення ID героїв в строку
                    quests: team.quests, // залишаємо quests без змін
                };

                return team ? new Team(teamData) : null;
            }
        } catch (error) {
            console.error("Error fetching team by ID:", error);
            throw error;
        }
    }

    /**
     * Saves a new team.
     * @param {Entities.Team} team
     * @returns {Promise<Entities.Team>}
     */
    async save(team) {
        try {
            const teamData = {
                title: team.title,
                description: team.description,
                members: team.members,
                quests: team.quests,
            };

            const result = await this.#collection.insertOne(teamData);

            return new Team({ id: result.insertedId.toString(), ...teamData });
        } catch (error) {
            console.error("Error saving team:", error);
            throw error;
        }
    }

    /**
     * Updates an existing team.
     * @param {Entities.Team} team
     * @returns {Promise<Entities.Team>}
     */
    async update(team) {
        try {
            const teamData = {
                title: team.title,
                description: team.description,
                members: team.members,
                quests: team.quests,
            };

            await this.#collection.updateOne(
                { _id: asObjectId(team.id) },
                { $set: teamData }
            );

            return new Team({ ...team, ...teamData });
        } catch (error) {
            console.error("Error updating team:", error);
            throw error;
        }
    }

    /**
     * Deletes a team by ID.
     * @param {string} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        try {
            await this.#collection.deleteOne({ _id: asObjectId(id) });
        } catch (error) {
            console.error("Error deleting team:", error);
            throw error;
        }
    }
}

module.exports = { teamRepository: new TeamRepository() };

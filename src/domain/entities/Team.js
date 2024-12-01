/**
 * Represents a team of heroes.
 * @implements {Entities.Team}
 */
class Team {
    /**
     * @param {EntityFields.Team} params
     */
    constructor({ id, title, description, members = [], quests = [] }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.members = members; // Array of heroes IDs
        this.quests = quests; // Array of quest IDs
    }

    /**
     * Adds a hero to the team.
     * @param {string} heroId
     */
    addHero(heroId) {
        if (this.members.find((member) => member === heroId)) {
            throw new Error("Hero is already part of the team");
        }

        this.members.push(heroId);
    }

    /**
     * Removes a hero from the team by ID.
     * @param {string} heroId
     */
    removeHero(heroId) {
        const heroIndex = this.members.findIndex((member) => member === heroId);
        console.log(heroId);
        console.log(this.members);

        if (heroIndex === -1) {
            throw new Error("Hero not found in the team");
        }

        this.members.splice(heroIndex, 1);
    }

    /**
     * Assigns a quest to the team.
     * @param {string } questsId
     */
    addQuest(questId) {
        if (this.quests.includes(questId)) {
            throw new Error("Quest is already assigned to the team");
        }

        this.quests.push(questId);
    }

    /**
     * Marks a quest as completed and removes it from the active list.
     * @param {string} questId
     */
    completeQuest(questId) {
        const questIndex = this.quests.findIndex((id) => id === questId);

        if (questIndex === -1) {
            throw new Error("Quest not found in the team's active quests");
        }

        this.quests.splice(questIndex, 1);
    }
}

module.exports = { Team };

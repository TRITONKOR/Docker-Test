/**
 * Represents a quest.
 * @implements {Entities.Quest}
 */
class Quest {
    /**
     * @param {EntityFields.Quest} params
     */
    constructor({
        id,
        title,
        description,
        status = "pending",
        assignedTeam = null,
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status; // "pending", "in-progress", "completed"
        this.assignedTeam = assignedTeam; // ID of the team assigned to the quest
    }

    /**
     * Assigns a team to the quest.
     * @param {string} teamId
     */
    assignTeam(teamId) {
        console.log(teamId);
        if (this.assignedTeam) {
            throw new Error("Quest is already assigned to a team");
        }

        this.assignedTeam = teamId;
        this.status = "in-progress";
    }

    /**
     * Marks the quest as completed.
     */
    complete() {
        if (!this.assignedTeam) {
            throw new Error(
                "Quest must be assigned to a team before it can be completed"
            );
        }

        this.status = "completed";
    }
}

module.exports = { Quest };

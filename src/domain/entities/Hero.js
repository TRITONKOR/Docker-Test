/**
 * Represents a hero in the system.
 * @implements {Entities.Hero}
 */
class Hero {
    /**
     * @param {EntityFields.Hero} params
     */
    constructor({ id, name, superpower }) {
        this.id = id;
        this.name = name;
        this.superpower = superpower;
        this.teamId = null;
    }

    setTeam(teamId) {
        this.teamId = teamId;
    }

    /**
     * Updates the hero's superpower.
     * @param {string} newSuperpower
     */
    updateSuperpower(newSuperpower) {
        this.superpower = newSuperpower;
    }
}

module.exports = { Hero };

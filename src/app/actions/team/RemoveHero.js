class RemoveHeroAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IQuestRepository} dependencies.heroRepository
     * @param {Repositories.ITeamRepository} dependencies.teamRepository
     */
    constructor({ heroRepository, teamRepository }) {
        this.heroRepository = heroRepository;
        this.teamRepository = teamRepository;
    }

    /**
     * Complete quest.
     * @param {string} heroId
     * @param {string} teamId
     * @returns {Promise<Entities.Team>}
     */
    async execute(heroId, teamId) {
        if (!heroId || !teamId) {
            throw new Error("Team ID must be provided");
        }

        // Fetch the quest by ID
        const hero = await this.heroRepository.getById(heroId);
        const team = await this.teamRepository.getById(teamId);

        if (!hero || !team) {
            throw new Error("Hero or Team not found");
        }

        console.log(hero);
        console.log(team);
        console.log(hero.id);

        team.removeHero(hero.id);
        hero.setTeam(null);

        // Update team and hero
        await this.heroRepository.update(hero);
        return await this.teamRepository.update(team);
    }
}

module.exports = { RemoveHeroAction };

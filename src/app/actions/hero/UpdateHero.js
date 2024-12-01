class UpdateHeroAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IHeroRepository} dependencies.heroRepository
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    }

    /**
     * Executes the use case to update a hero's superpower.
     * @param {string} heroId
     * @param {Object} updateData
     * @returns {Promise<Entities.Hero>}
     */
    async execute(heroId, updateData) {
        if (!updateData) {
            throw new Error("updateData must be provided");
        }

        // Fetch the hero by ID
        const hero = await this.heroRepository.getById(heroId);

        if (!hero) {
            throw new Error("Hero not found");
        }

        if (updateData.name !== undefined) {
            hero.name = updateData.name;
        }

        if (updateData.superpower !== undefined) {
            hero.updateSuperpower(updateData.superpower);
        }

        // Update hero
        return await this.heroRepository.update(hero);
    }
}

module.exports = { UpdateHeroAction };

class DeleteHeroAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IHeroRepository} dependencies.heroRepository
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    }

    /**
     * Executes the use case to delete a hero by ID.
     * @param {string} heroId
     * @returns {Promise<void>}
     */
    async execute(heroId) {
        if (!heroId) {
            throw new Error("Hero ID must be provided");
        }

        // Fetch the hero by ID
        const hero = await this.heroRepository.getById(heroId);

        if (!hero) {
            throw new Error("Hero not found");
        }

        // Delete the hero
        await this.heroRepository.delete(heroId);
    }
}

module.exports = { DeleteHeroAction };

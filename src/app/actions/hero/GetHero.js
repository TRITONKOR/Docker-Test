class GetHeroAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IHeroRepository} dependencies.heroRepository
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    }

    /**
     * Executes the use case to get a hero by ID.
     * @param {string} heroId
     * @returns {Promise<Entities.Hero | null>}
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

        return hero;
    }
}

module.exports = { GetHeroAction };

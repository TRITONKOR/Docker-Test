class ListHeroesAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IHeroRepository} dependencies.heroRepository
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    }

    /**
     * Executes the use case to get a list of heroes.
     * @returns {Promise<Entities.Hero[]>}
     */
    async execute() {
        const heroes = await this.heroRepository.getAll();

        if (!heroes) {
            throw new Error("Heroes not found");
        }

        return heroes;
    }
}

module.exports = { ListHeroesAction };

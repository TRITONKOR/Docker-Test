const { Hero } = require("../../../domain/entities/Hero");

class CreateHeroAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IHeroRepository} dependencies.heroRepository
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    }

    /**
     * Executes the use case to create a new hero.
     * @param {Object} heroData
     * @param {string} heroData.name
     * @param {string} heroData.superpower
     * @returns {Promise<Entities.Hero>}
     */
    async execute(heroData) {
        const { name, superpower } = heroData;

        // Validate input data
        if (!name || !superpower) {
            throw new Error("Missing required hero data");
        }

        // Create new hero entity
        const hero = new Hero({
            name,
            superpower,
        });

        // Save the hero
        console.log("action");

        console.log(this.heroRepository);
        return await this.heroRepository.save(hero);
    }
}

module.exports = { CreateHeroAction };

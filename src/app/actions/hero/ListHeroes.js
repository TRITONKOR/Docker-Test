const { redisClient } = require("../../../infra/database/redis/index");
const { HttpException } = require("../../../presentation/errors/httpException");

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
    async execute(filters) {
        const cacheKey = `Heroes:${this.normalizeFilters(filters)}`;

        const cachedHeroes = await redisClient.get(cacheKey);

        if (cachedHeroes) {
            const heroes = JSON.parse(cachedHeroes);

            if (heroes.items.length === 0) {
                throw new HttpException(404, "No heroes found");
            }

            return heroes;
        }

        const heroes = await this.heroRepository.find(filters);

        redisClient.set(cacheKey, JSON.stringify(heroes), "EX", 3600);

        if (heroes.items.length === 0) {
            throw new HttpException(404, "No heroes found");
        }

        return heroes;
    }

    normalizeFilters(filters) {
        const sortedEntries = Object.entries(filters).sort(([keyA], [keyB]) =>
            keyA.localeCompare(keyB)
        );

        const normalizedObject = Object.fromEntries(sortedEntries);

        return JSON.stringify(normalizedObject);
    }
}

module.exports = { ListHeroesAction };

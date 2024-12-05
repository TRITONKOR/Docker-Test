const { Hero } = require("../../../domain/entities/Hero");
const {
    mongoDBAdapter: { $db, asObjectId },
} = require("./../../database/mongo/adapter");

/**
 * @implements {Repositories.IHeroRepository}
 */
class HeroRepository {
    #collection = $db.collection("heroes");

    /**
     * Fetches a hero by ID.
     * @param {string} id
     * @returns {Promise<Entities.Hero | null>}
     */
    async getById(id) {
        try {
            const hero = await this.#collection.findOne({
                _id: asObjectId(id),
            });

            if (hero) {
                const heroData = {
                    id: hero._id.toString(),
                    name: hero.name,
                    superpower: hero.superpower,
                    teamId: hero.teamId ? hero.teamId.toString() : null,
                };

                return new Hero(heroData);
            }

            return null;
        } catch (error) {
            console.error("Error fetching hero by ID:", error);
            throw error;
        }
    }

    /**
     * Fetches all heroes.
     * @returns {Promise<Entities.Hero[]>}
     */
    async getAll() {
        try {
            const heroes = await this.#collection.find({}).toArray();

            return heroes.map(
                (hero) =>
                    new Hero({
                        id: hero._id.toString(),
                        name: hero.name,
                        superpower: hero.superpower,
                        teamId: hero.teamId ? hero.teamId.toString() : null,
                    })
            );
        } catch (error) {
            console.error("Error fetching all heroes:", error);
            throw error;
        }
    }

    async find(filters) {
        const { term, limit = 10, offset = 0, sort = "releaseDate" } = filters;

        const whereClause = term
            ? { name: { $regex: term, $options: "i" } }
            : {};

        const heroesCursor = this.#collection
            .find(whereClause)
            .skip(offset)
            .limit(limit)
            .sort({ [sort]: -1 });

        const heroes = await heroesCursor.toArray();
        const total = await this.#collection.countDocuments(whereClause);

        return {
            items: heroes.map((hero) => new Hero(hero)),
            page: Math.ceil(offset / limit) + 1,
            total,
        };
    }

    /**
     * Saves a new hero.
     * @param {Entities.Hero} hero
     * @returns {Promise<Entities.Hero>}
     */
    async save(hero) {
        try {
            const heroData = {
                name: hero.name,
                superpower: hero.superpower,
                teamId: null,
            };

            const result = await this.#collection.insertOne(heroData);

            return new Hero({ id: result.insertedId, ...heroData });
        } catch (error) {
            console.error("Error saving hero:", error);
            throw error;
        }
    }

    /**
     * Updates an existing hero.
     * @param {Entities.Hero} hero
     * @returns {Promise<Entities.Hero>}
     */
    async update(hero) {
        try {
            const heroData = {
                name: hero.name,
                superpower: hero.superpower,
                teamId: hero.teamId,
            };

            await this.#collection.updateOne(
                { _id: asObjectId(hero.id) },
                { $set: heroData }
            );

            return new Hero({ ...hero, ...heroData });
        } catch (error) {
            console.error("Error updating hero:", error);
            throw error;
        }
    }

    /**
     * Deletes a hero by ID.
     * @param {string} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        try {
            await this.#collection.deleteOne({
                _id: asObjectId(id),
            });
        } catch (error) {
            console.error("Error deleting hero:", error);
            throw error;
        }
    }
}

module.exports = { heroRepository: new HeroRepository() };

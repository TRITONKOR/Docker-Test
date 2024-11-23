const { mongoDBAdapter } = require("../../database/mongo/adapter");

class HeroRepository {
    constructor(adapter) {
        this.adapter = adapter;
        this.collectionName = "hero";
    }

    /**
     * Створити нового героя
     * @param {HeroShape} data
     * @returns {Promise<HeroInstance>}
     */
    async create(data) {
        if (!data.name || !data.class || !data.level) {
            throw new Error("Відсутні необхідні поля");
        }

        const heroData = {
            name: data.name,
            class: data.class,
            level: data.level,
            health: data.health || 100,
            mana: data.mana || 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        try {
            const collection = this.adapter.getCollection(this.collectionName);
            const result = await collection.insertOne(heroData);
            return { id: result.insertedId, ...heroData };
        } catch (error) {
            console.error("Error creating hero:", error);
            throw error;
        }
    }

    /**
     * Отримати героя або список героїв
     * @param {string} [id]
     * @returns {Promise<HeroInstance | HeroInstance[]>}
     */
    async read(id) {
        try {
            const collection = this.adapter.getCollection(this.collectionName);

            if (id) {
                const hero = await collection.findOne({
                    _id: this.adapter.asObjectId(id),
                });

                if (!hero) {
                    throw new Error(`Hero with ID ${id} not found`);
                }

                return { id: hero._id, ...hero };
            } else {
                const heroes = await collection.find({}).toArray();
                return heroes.map((hero) => ({ id: hero._id, ...hero }));
            }
        } catch (error) {
            console.error("Error fetching hero data:", error.message || error);
            throw new Error("Failed to fetch hero data");
        }
    }

    /**
     * Оновити дані героя
     * @param {string} id
     * @param {Partial<HeroShape>} data
     * @returns {Promise<HeroInstance>}
     */
    async update(id, data) {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined)
        );

        if (Object.keys(filteredData).length === 0) {
            throw new Error("No valid fields provided for update");
        }

        try {
            const collection = this.adapter.getCollection(this.collectionName);
            const result = await collection.findOneAndUpdate(
                { _id: this.adapter.asObjectId(id) },
                { $set: { ...filteredData, updatedAt: new Date() } },
                { returnDocument: "after" }
            );
            console.log("FindOneAndUpdate result:", result);

            if (!result) {
                throw new Error(`Hero with ID ${id} not found`);
            }

            return { id: result._id, ...result };
        } catch (error) {
            console.error("Error updating hero:", error);
            throw new Error("Failed to update hero");
        }
    }

    /**
     * Видалити героя
     * @param {string} id
     * @returns {Promise<{ deletedCount: number }>}
     */
    async delete(id) {
        try {
            const collection = this.adapter.getCollection(this.collectionName);
            const result = await collection.deleteOne({
                _id: this.adapter.asObjectId(id),
            });

            if (result.deletedCount === 0) {
                throw new Error(`Hero with ID ${id} not found`);
            }

            return { deletedCount: result.deletedCount };
        } catch (error) {
            console.error("Error deleting hero:", error.message || error);
            throw new Error("Failed to delete hero");
        }
    }
}

module.exports.heroRepository = new HeroRepository(mongoDBAdapter);

// Типи даних
/**
 * @typedef {{
 *  name: string,
 *  class: string,
 *  level: number,
 *  health?: number,
 *  mana?: number,
 * }} HeroShape
 */
/**
 * @typedef {HeroShape & {
 *  id: string,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} HeroInstance
 */

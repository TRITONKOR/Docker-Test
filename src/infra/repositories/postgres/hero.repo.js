const { postgresAdapter } = require("../../database/postgres/adapter");

class HeroRepository {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async create(data) {
        if (!data.name || !data.class || !data.level) {
            throw new Error("Відсутні необхідні поля");
        }

        try {
            const result = await this.adapter.query("hero", "create", {
                data: {
                    name: data.name,
                    class: data.class,
                    level: data.level,
                    health: data.health || 100,
                    mana: data.mana || 100,
                },
            });
            return result;
        } catch (error) {
            console.error("Error creating hero:", error);
            throw error;
        }
    }

    async read(id) {
        try {
            if (id) {
                const result = await this.adapter.query("hero", "findUnique", {
                    where: { id: id },
                });
                console.log("Create result: " + result);

                if (!result) {
                    throw new Error(`Hero with ID ${id} not found`);
                }

                return result;
            } else {
                const result = await this.adapter.query("hero", "findMany", {});
                console.log("Direct Read Result (all heroes):", result);

                if (!result) {
                    console.warn("No heroes found in the database");
                    return [];
                }

                return result;
            }
        } catch (error) {
            console.error("Error fetching hero data:", error.message || error);
            throw new Error("Failed to fetch hero data");
        }
    }

    async update(id, data) {
        const existingHero = await this.read(id);

        if (!existingHero) {
            throw new Error(`Hero with ID ${id} not found`);
        }

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined)
        );

        try {
            const result = await this.adapter.query("hero", "update", {
                where: { id: id },
                data: filteredData,
            });

            console.log("Update result:", result);
            return result;
        } catch (error) {
            console.error("Error updating hero:", error);
            throw new Error("Failed to update hero");
        }
    }

    async delete(id) {
        try {
            if (!id) {
                throw new Error("ID is required for deleting a hero");
            }

            const existingHero = await this.read(id);
            if (!existingHero) {
                throw new Error(`Hero with ID ${id} does not exist`);
            }

            const result = await this.adapter.query("hero", "delete", {
                where: { id: id },
            });

            if (!result) {
                throw new Error(`Failed to delete hero with ID ${id}`);
            }

            return result;
        } catch (error) {
            console.error("Error deleting hero:", error.message || error);
            throw new Error("Failed to delete hero");
        }
    }
}

module.exports.heroRepository = new HeroRepository(postgresAdapter);

// Type definitions
/**
 * @typedef {{
 *  name: string,
 *  class: string,
 *  level: number,
 *  health: number,
 *  mana: number,
 * }} HeroShape
 */
/**
 * @typedef { HeroShape & {
 *  id: string,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} HeroInstance
 */

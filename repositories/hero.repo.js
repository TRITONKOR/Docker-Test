const { randomUUID } = require("node:crypto");

class HeroRepository {
    constructor() {
        this.storage = new Map();
    }

    async create(data) {
        if (!data.name || !data.class || !data.level) {
            throw new Error("Missing required fields");
        }

        const id = randomUUID();
        const syncedTimestamp = Date.now();

        const hero = {
            id,
            ...data,
            createdAt: syncedTimestamp,
            updatedAt: syncedTimestamp,
        };

        this.storage.set(id, hero);
        return hero;
    }

    async read(id) {
        if (id && !this.storage.has(id)) {
            throw new Error("Hero not found");
        }

        return id ? this.storage.get(id) : Array.from(this.storage.values());
    }

    async update(id, data) {
        if (!this.storage.has(id)) {
            throw new Error("Hero not found");
        }

        const existingHero = this.storage.get(id);
        delete data.id;

        const updatedHero = {
            ...existingHero,
            ...data,
            updatedAt: Date.now(),
        };

        this.storage.set(id, updatedHero);
        return updatedHero;
    }

    async delete(id) {
        if (!this.storage.has(id)) {
            throw new Error("Hero not found");
        }

        const hero = this.storage.get(id);
        this.storage.delete(id);
        return hero;
    }
}

module.exports.heroRepository = new HeroRepository();

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

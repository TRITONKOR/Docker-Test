const { PrismaClient } = require("@prisma/client");

class PostgresAdapter {
    static instance;
    #prisma;

    constructor() {
        if (PostgresAdapter.instance) {
            return PostgresAdapter.instance;
        }

        this.#prisma = new PrismaClient();
        PostgresAdapter.instance = this;
        return this;
    }

    async connect() {
        try {
            await this.#prisma.$queryRaw`SELECT 1;`;
            console.log("Connected to PostgreSQL with Prisma");
            return true;
        } catch (error) {
            console.error("Failed to connect to PostgreSQL:", error);
            return false;
        }
    }

    get client() {
        return this.#prisma;
    }

    async query(model, action, params) {
        try {
            console.log("model" + model);
            console.log("action" + action);
            console.log("params" + params);
            return await this.#prisma[model][action](params);
        } catch (error) {
            console.error("Error executing Prisma query:", error);
            throw error;
        }
    }

    async close() {
        await this.#prisma.$disconnect();
        console.log("Prisma connection closed");
    }
}

const postgresAdapter = new PostgresAdapter();
Object.freeze(postgresAdapter);
module.exports = { postgresAdapter };

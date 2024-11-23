const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI, MONGO_DB } = require("../../../../config");

class MongoDBAdapter {
    static instance;

    /** @type {MongoClient} */
    #client;

    /** @type {import('mongodb').Db} */
    #database;

    constructor() {
        if (MongoDBAdapter.instance) {
            return MongoDBAdapter.instance;
        }

        this.#client = new MongoClient(MONGO_URI);
        MongoDBAdapter.instance = this;

        return this;
    }

    /**
     * Connect to MongoDB
     */
    async connect() {
        if (
            this.#client &&
            this.#client.topology &&
            this.#client.topology.isConnected()
        ) {
            console.log("MongoDB is already connected.");
            return;
        }

        try {
            await this.#client.connect();
            this.#database = this.#client.db(MONGO_DB);
            console.log(`Connected to MongoDB: ${MONGO_DB}`);
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    /**
     * Close MongoDB connection
     */
    async close() {
        if (
            !this.#client ||
            !this.#client.topology ||
            !this.#client.topology.isConnected()
        ) {
            console.log("MongoDB connection is already closed.");
            return;
        }

        try {
            await this.#client.close();
            console.log("MongoDB connection closed.");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
            throw error;
        }
    }

    /**
     * Get collection by name
     * @param {string} collectionName
     * @returns {import('mongodb').Collection}
     */
    getCollection(collectionName) {
        if (!this.#database) {
            throw new Error(
                "Database connection is not established. Call connect() first."
            );
        }

        return this.#database.collection(collectionName);
    }

    /**
     * Validate and convert string ID to ObjectId
     * @param {string} id
     * @returns {ObjectId}
     */
    asObjectId(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid MongoDB ID format.");
        }
        return new ObjectId(id);
    }

    /**
     * Create a new ObjectId
     * @returns {ObjectId}
     */
    newObjectId() {
        return new ObjectId();
    }

    /**
     * Perform a health check to ensure MongoDB is connected
     * @returns {Promise<boolean>}
     */
    async isConnected() {
        try {
            if (this.#client.topology && this.#client.topology.isConnected()) {
                return true;
            }

            await this.#client.db(MONGO_DB).command({ ping: 1 });
            return true;
        } catch (error) {
            console.error("MongoDB is not connected:", error);
            return false;
        }
    }
}

// Create and freeze a singleton instance
const mongoDBAdapter = new MongoDBAdapter();
Object.freeze(mongoDBAdapter);

module.exports = { mongoDBAdapter };

const { User } = require("../../../domain/entities/User");
const {
    mongoDBAdapter: { $db, asObjectId },
} = require("./../../database/mongo/adapter");

/**
 * @implements {Repositories.IUserRepository}
 */
class UserRepository {
    #collection = $db.collection("users");

    /**
     * Fetches a user by ID.
     * @param {string} id
     * @returns {Promise<Entities.User | null>}
     */
    async getById(id) {
        try {
            const user = await this.#collection.findOne({
                _id: asObjectId(id),
            });

            if (user) {
                const userData = {
                    id: user._id.toString(),
                    username: user.username,
                    isPrivileged: user.isPrivileged,
                    passwordHash: user.passwordHash,
                };

                return user ? new User(userData) : null;
            }
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

    /**
     * Fetches a user by username.
     * @param {string} username
     * @returns {Promise<Entities.User | null>}
     */
    async getByUsername(username) {
        try {
            const user = await this.#collection.findOne({ username });

            if (user) {
                const userData = {
                    id: user._id.toString(),
                    username: user.username,
                    isPrivileged: user.isPrivileged,
                    passwordHash: user.passwordHash,
                };

                return new User(userData);
            }

            return null;
        } catch (error) {
            console.error("Error fetching user by username:", error);
            throw error;
        }
    }

    /**
     * Saves a new user.
     * @param {Entities.User} user
     * @returns {Promise<Entities.User>}
     */
    async save(user) {
        try {
            const userData = {
                username: user.username,
                isPrivileged: user.isPrivileged,
                passwordHash: user.passwordHash,
            };

            const result = await this.#collection.insertOne(userData);

            return new User({ id: result.insertedId.toString(), ...userData });
        } catch (error) {
            console.error("Error saving user:", error);
            throw error;
        }
    }
}

module.exports = { userRepository: new UserRepository() };

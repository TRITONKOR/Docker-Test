class User {
    /**
     * @param {EntityFields.User} params
     */
    constructor({ id, username, passwordHash, isPrivileged }) {
        this.id = id;
        this.username = username;
        this.isPrivileged = isPrivileged || false;
        this.passwordHash = passwordHash || null;
    }
}

module.exports = { User };

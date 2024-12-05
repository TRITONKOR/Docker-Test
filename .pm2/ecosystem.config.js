const fs = require("node:fs");
const os = require("node:os");

const dotenv = require("dotenv");

const envFile = fs.existsSync("./prod.env") ? "./prod.env" : "./.env";

dotenv.config({ path: envFile });

console.log(`[PM2] Loaded environment variables from: ${envFile}`);

module.exports = {
    apps: [
        {
            name: "my-app",
            script: "./server.js",
            exec_mode: "cluster",
            max_memory_restart: "500M",
            instances: Math.min(4, os.cpus().length),
            env: {
                NODE_ENV: process.env.NODE_ENV || "development",
            },
            env_production: {
                NODE_ENV: "production",
                APP_PORT: 3000,
                APP_HOST: "0.0.0.0",
                MONGO_URI: process.env.MONGO_URI,
            },
        },
    ],
};

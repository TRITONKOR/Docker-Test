const { PORT, HOST } = require("./config");
const { bootstrapFastify } = require("./app");
const { mongoDBAdapter } = require("./src/infra/database/mongo/adapter");
const { postgresAdapter } = require("./src/infra/database/postgres/adapter");

let fastify;

const startServer = async () => {
    fastify = bootstrapFastify();

    try {
        await Promise.all([
            mongoDBAdapter.connect(),
            postgresAdapter.connect(),
        ]);

        await fastify.listen({ port: PORT, host: HOST });
        console.log(`Server listening on ${HOST}:${PORT}`);
    } catch (err) {
        handleStartupError(err);
    }
};

const handleStartupError = (err) => {
    if (fastify && fastify.log) {
        fastify.log.error("Server failed to start:", err);
    } else {
        console.error("Server failed to start. Error details:");
        console.error("Message:", err.message);
        console.error("Stack:", err.stack);
    }
    process.exit(1);
};

const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    if (fastify) {
        try {
            await fastify.close();
            console.log("Fastify server closed.");
        } catch (err) {
            console.error("Error during shutdown:", err);
            process.exit(1);
        }
    }
    process.exit(0);
};

const setupSignalHandlers = () => {
    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    signals.forEach((signal) => {
        process.on(signal, async () => {
            try {
                await shutdown(signal);
            } catch (err) {
                console.error(`Error handling ${signal}:`, err);
            }
        });
    });

    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err.message);
        console.error("Stack:", err.stack);
        process.exit(1);
    });

    process.on("unhandledRejection", (reason) => {
        console.error("Unhandled Rejection:", reason);
    });
};

setupSignalHandlers();
startServer();

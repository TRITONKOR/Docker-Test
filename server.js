const { PORT, HOST } = require("./config");
const { bootstrapFastify } = require("./app");

let fastify;

const startServer = async () => {
    fastify = bootstrapFastify();

    try {
        await fastify.listen({ port: PORT, host: HOST });
        console.log(`Server listening on ${HOST}:${PORT}`);
    } catch (err) {
        handleStartupError(err);
    }
};

const handleStartupError = (err) => {
    if (fastify && fastify.log) {
        fastify.log.error(err);
    } else {
        console.error("Error starting server:", err);
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
    const signals = ["SIGINT", "SIGTERM", "SIGQUIT", "uncaughtException"];
    signals.forEach((signal) => {
        process.on(signal, () => shutdown(signal));
    });
};

setupSignalHandlers();
startServer();

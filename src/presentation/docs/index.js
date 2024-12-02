module.exports.patchDocs = (fastify) => {
    fastify.register(require("@fastify/swagger"), {
        swagger: {
            info: {
                title: "Product API",
                description: "API documentation for the product endpoints",
                version: "0.4.0",
            },
            host: "localhost",
            basePath: "/api",
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "Heroes", description: "Hero related end-points" },
                { name: "Teams", description: "Team related end-points" },
                { name: "Quests", description: "Quest related end-points" },
            ],
        },
    });

    fastify.register(require("@fastify/swagger-ui"), {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "full",
            deepLinking: false,
        },
        exposeRoute: true,
    });
};

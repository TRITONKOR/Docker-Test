const Fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

require("pino-pretty");

const { IS_DEV_ENV } = require("./config");
const { patchRouting } = require("./src/presentation/routes");
const { patchContext } = require("./src/presentation/context");

const bootstrapFastify = () => {
    const fastify = Fastify({
        exposeHeadRoutes: false,
        connectionTimeout: 20000,
        ignoreTrailingSlash: false,
        logger: !IS_DEV_ENV || {
            level: "debug",
            transport: {
                target: "@mgcrea/pino-pretty-compact",
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                },
            },
        },
        disableRequestLogging: true,
    });

    fastify.register(fastifySwagger, {
        swagger: {
            info: {
                title: "API Documentation",
                description: "Automatically generated API documentation",
                version: "1.0.0",
            },
            host: "localhost/api",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
    });

    fastify.register(fastifySwaggerUi, {
        routePrefix: "/api-docs", //
        staticCSP: true,
        transformStaticCSP: (header) => header,
        uiConfig: {
            docExpansion: "full",
        },
    });

    patchContext(fastify);

    patchRouting(fastify);

    if (IS_DEV_ENV) {
        fastify.register(require("@mgcrea/fastify-request-logger"), {});

        fastify.ready(() => {
            console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
        });
    }

    return fastify;
};

module.exports = { bootstrapFastify };

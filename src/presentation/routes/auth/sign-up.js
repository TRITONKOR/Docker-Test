const { SignUpAction } = require("../../../app/actions/auth/sign-up");

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.signUp = {
    url: "/auth/sign-up",
    method: "POST",
    handler: async (request, reply) => {
        const { username, password } = request.body;

        await new SignUpAction(request.server.domainContext).execute(
            username,
            password
        );

        return reply.code(201).send();
    },
    schema: {
        tags: ["Auth"],
        description:
            "Endpoint for user registration. Creates a new user in the system.",
        body: {
            type: "object",
            required: ["username", "password"],
            properties: {
                username: {
                    type: "string",
                    minLength: 4,
                    maxLength: 32,
                    description:
                        "Username for the new account. Must be unique and 4-32 characters long.",
                },
                password: {
                    type: "string",
                    minLength: 8,
                    maxLength: 32,
                    description:
                        "Password for the new account. Must be 8-32 characters long.",
                },
            },
            additionalProperties: false,
            description:
                "The request body should contain 'username' and 'password'.",
        },
        response: {
            201: {
                type: "null",
                description:
                    "User successfully created. No content is returned.",
            },
            400: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description:
                            "Error message describing what went wrong.",
                    },
                },
                description:
                    "Invalid input data (e.g., missing fields or validation errors).",
            },
        },
    },
};

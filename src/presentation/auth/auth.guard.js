module.exports.authGuardFactory = ({ isPrivilegeRequired = false } = {}) =>
    async function (request, reply) {
        const sessionData = request.requestContext.get("sessionData");
        console.log(sessionData);

        if (!sessionData?.userId) {
            return reply.code(401).send("Unauthorized: Session is required");
        }

        if (isPrivilegeRequired && !sessionData.isPrivileged) {
            return reply
                .code(403)
                .send("Forbidden: Advanced privilege is required");
        }
    };

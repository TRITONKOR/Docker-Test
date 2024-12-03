class HttpException extends Error {
    /**
     * @param {number} statusCode - HTTP статус код.
     * @param {string} message - Повідомлення про помилку.
     */
    constructor(statusCode, message) {
        if (!message) {
            message = HttpException.statusMessages[statusCode] || "Error";
        }

        super(message);
        this.statusCode = statusCode;
        this.name = "HttpException";
        Error.captureStackTrace(this, this.constructor);
    }

    static statusMessages = {
        200: "OK",
        201: "Created",
        202: "Accepted",
        204: "No Content",
        301: "Moved Permanently",
        302: "Found",
        304: "Not Modified",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
        501: "Not Implemented",
        503: "Service Unavailable",
    };
}

module.exports = { HttpException };

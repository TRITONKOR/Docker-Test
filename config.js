require("dotenv").config();

module.exports = {
    PORT: +process.env.PORT || 3000,
    HOST: process.env.HOST || "0.0.0.0",
    NODE_ENV: process.env.NODE_ENV,
    IS_DEV_ENV: process.env.NODE_ENV === "development",
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB: process.env.MONGO_DB,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
};

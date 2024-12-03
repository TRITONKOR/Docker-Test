const jwt = require("jsonwebtoken");

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = require("../../../config");

const ACCESS_TOKEN_EXPIRATION = "15m";
const REFRESH_TOKEN_EXPIRATION = "7d";

class JwtService {
    generateAccessToken(payload) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRATION,
        });
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, ACCESS_TOKEN_SECRET);
        } catch (error) {
            throw new Error("Invalid or expired access token");
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw new Error("Invalid or expired refresh token");
        }
    }
}

module.exports = { jwtService: new JwtService() };

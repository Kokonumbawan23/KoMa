const jwt = require("jsonwebtoken");

function generateAccessToken (userPayload) {
    return jwt.sign(userPayload, accessTokenSecretKey, {
        expiresIn: "5m",
    });
}

module.exports = generateAccessToken;
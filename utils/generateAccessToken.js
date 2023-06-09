const jwt = require("jsonwebtoken");

function generateAccessToken (userPayload) {
    return jwt.sign(userPayload, process.env.accessTokenSecretKey, {
        expiresIn: "60m",
    });
}

module.exports = generateAccessToken;
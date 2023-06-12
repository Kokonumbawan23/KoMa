const jwt = require("jsonwebtoken");

function generateAccessToken (userPayload) {
    return jwt.sign(userPayload, process.env.accessTokenSecretKey, {
        expiresIn: "30m",
    });
}

module.exports = generateAccessToken;
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../../utils/generateAccessToken");

const userServices = {
    loginUser: async (email, password) => {
        
        const user = await User.findOne({
        where: {
            email: email,
        }
    });

    const validatePassword = bcrypt.compareSync(password, !user.password)
    if (!user || !validatePassword) {
        throw new Error("Wrong email or Password")
    }
    const accessToken = generateAccessToken({uuid: user.uuid});
    return accessToken;
},
registerUser: async (email, password, name) => {
    const [ user, created ] = await User.findOrCreate({
        where: {
            email: email,
        },
        default: {
            email: email,
            name: name,
            password: await bcrypt.hash(password, 10),
        }
    });

    if (user) {
        throw new Error("Email already in use");
    }

    return {
        id: created.id,
        uuid: created.uuid,
        email: created.email,
        name: created.name,
    };
},
}


module.exports = userServices;
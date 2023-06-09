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
    console.log(user);
    const validatePassword = bcrypt.compareSync(password, user?.password)
    if (!user && !validatePassword) {
        throw new Error("Wrong email or Password")
    }
    const accessToken = generateAccessToken({uuid: user.uuid});
    return accessToken;
},
registerUser: async (email, password, fullName) => {
    console.log(fullName)
    const [ user, created ] = await User.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            email: email,
            fullName: fullName,
            password: await bcrypt.hash(password, 10),
        }
    });

    // const checkUser = await User.findOne({
    //     where: {
    //         email: email
    //     }
    // });
 
    if (!created) {
        throw new Error("Email already in use");
    }
    // const passwordEncrypted = await bcrypt.hash(password, 10);
    // const createUser = await User.create({
    //     email: email,
    //     password:  passwordEncrypted,
    //     fullName: name,
    // });

    return {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        name: user.name,
    };
},
}


module.exports = userServices;
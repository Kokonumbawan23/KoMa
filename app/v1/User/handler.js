const { validateLoginUserSchema } = require("../../../Validator/User");
const userServices = require("../../../services/mysql/userServices");


const bcrypt = requier("bcrypt");

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
        validateLoginUserSchema({email, password});
        const user = await userServices.loginUser(email, password);
        res.status(200).json({
            status: "success",
            accessToken: user,
        });
    } catch(error) {
        next(error);
        }
        
    }
}


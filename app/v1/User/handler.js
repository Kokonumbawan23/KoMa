const { validateRegisterUserSchema } = require("../../../Validator/User");
const { validateLoginUserSchema } = require("../../../Validator/User");
const userServices = require("../../../services/mysql/userServices");



module.exports = {
    handlerLoginUser: async (req, res, next) => {
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
    },
    handlerRegisterUser: async (req, res, next) => {
        try {
            const { email, fullName, password } = req.body;
            validateRegisterUserSchema({email, fullName, password});
            const user = await userServices.registerUser(email, password, fullName);

            res.status(201).json({
                status: 'success',
                message: "Successfully register user",
                test: user,
            });
        } catch(error) {
            next(error);
        }
    }
}


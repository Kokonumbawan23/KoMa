const { validateRegisterUserSchema, validateChangePasswordSchema } = require("../../../Validator/User");
const { validateLoginUserSchema } = require("../../../Validator/User");
const userServices = require("../../../services/mysql/userServices");

module.exports = {
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateLoginUserSchema({ email, password });
      const user = await userServices.loginUser(email, password);
      res.status(200).json({
        status: "success",
        accessToken: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { email, fullName, password } = req.body;
      validateRegisterUserSchema({ email, fullName, password });
      const user = await userServices.registerUser(email, fullName, password);

      res.status(201).json({
        status: "success",
        message: "Successfully register user",
        test: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdatePassword: async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const uuid = req.user.uuid;
        validateChangePasswordSchema({oldPassword, newPassword});
      const updatePassword = await userServices.changePassword(
        uuid,
        oldPassword,
        newPassword,
        confirmPassword
      );

      res.status(200).json({
        status: 'succes',
        message: 'Successfully update Password',
      })
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateProfileUser: async (req, res, next) => {

  },
  handlerGetDetailUser: async (req, res, next) => {
    
  }

};

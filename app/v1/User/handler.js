require('dotenv').config({path: __dirname+ '/../../../.env'});

const {
  validateRegisterUserSchema,
  validateChangePasswordSchema,
} = require("../../../Validator/User");
const { validateLoginUserSchema } = require("../../../Validator/User");
const userServices = require("../../../services/mysql/userServices");
const CryptoJS = require('crypto-js')
const AES = require('crypto-js/aes')

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
      const { email, fullName, password, gender } = req.body;
      validateRegisterUserSchema({ email, fullName, password });
      const user = await userServices.registerUser(email, fullName, password, gender);

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
      validateChangePasswordSchema({ oldPassword, newPassword });
      validateChangePasswordSchema({ oldPassword, newPassword });
      const updatePassword = await userServices.changePassword(
        uuid,
        oldPassword,
        newPassword,
        confirmPassword
      );

      res.status(200).json({
        status: "succes",
        message: "Successfully update Password",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateProfileUser: async (req, res, next) => {
    try {
      const { fullName, height, weight, phoneNumber } = req.body;
      const {uuid} = req.user;
      const user = await userServices.updateProfile(
        uuid,
        fullName,
        height,
        weight,
        phoneNumber
      );

      res.status(200).json({
        status: 'success',
        message: 'Successfully Update User',
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetDetailUser: async (req, res, next) => {
    try {
      const {uuid} = req.user;
      const user = await userServices.userByUUID(uuid);

      res.status(200).json({
        status: "sucess",
        message: "Successfully get Detail User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGenerateResetPasswordOTP: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(email)

      const resOtp = await userServices.generateResetPasswordOTP(email);

      res.status(200).json({
        status: "success",
        message: "Email sended",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerVerifyResetPasswordOTP: async (req,res,next) => {
    try {
        const {otp} = req.body;

        const verifiedOtpUuid = await userServices.verifyResetPasswordOTP(otp);

        const encryptedUuid = AES.encrypt(verifiedOtpUuid,process.env.AES_ENCRYPT_KEY).toString();

        res.status(200).json({
            status: "success",
            message: "Otp verified",
            key: encryptedUuid
        });

    } catch (error) {
        next(error)
    }
  },
  handlerGenerateNewResetPassword: async (req,res,next) => {
    try {
        const {encryptKey, password, confirmPassword} = req.body;

        const decryptedKey = AES.decrypt(encryptKey,process.env.AES_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);

        console.log(decryptedKey)

        const newPassword = await userServices.generateNewResetPassword(decryptedKey, password, confirmPassword);

        res.status(200).json({
            status: "success",
            message: "success update user password"
        });    

    } catch (error) {
        next(error)
    }
  },
  handlerUpdatePhotoProfile: async (req, res, next) => {
    try {
      const image = req.publicUrl;
      const { uuid } = req.user;
      if (!image) {
        throw new Error("Image is required");
      }
      const user = await userServices.updatePhotoProfile(uuid, image);

      res.status(201).json({
        status: 'success',
        message: "Successfully Change Photo Profile",
      });

    } catch(error) {
      next(error);
    }
  }, 
  handlerDeleteImageProfile: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const user = await userServices.updatePhotoProfile(uuid);
      res.status(200).json({
        status: 'success',
        message: "Successfully delete Photo",
      });
    } catch (error) {
      next(error);
    }
  }
};

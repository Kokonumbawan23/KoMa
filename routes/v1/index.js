const express = require("express");
const { handlerGetDataById, handlerGetDataByIngredient, handlerGetRandomizedData } = require("../../app/v1/Recipe/handler");
const { handlerRegisterUser, handlerLoginUser, handlerUpdatePassword, handlerGenerateResetPasswordOTP,handlerVerifyResetPasswordOTP, handlerGenerateNewResetPassword, handlerGetDetailUser, handlerUpdateProfileUser } = require("../../app/v1/User/handler");
const authenticationToken = require("../../middleware/authenticationToken");


const router = express.Router();


router.post("/auth/register", handlerRegisterUser);
router.post("/auth/login", handlerLoginUser);


router.post("/user/changepassword", authenticationToken, handlerUpdatePassword);
router.post("/user/otpgen", handlerGenerateResetPasswordOTP);
router.post("/user/otpver", handlerVerifyResetPasswordOTP);
router.post("/user/resetpassword", handlerGenerateNewResetPassword);

router.get("/user/detail", authenticationToken, handlerGetDetailUser);
router.post("/user/detail/update", authenticationToken, handlerUpdateProfileUser);


router.get("/recipe/random", handlerGetRandomizedData);
router.get("/recipe", handlerGetDataByIngredient);
router.get("/recipe/:id", handlerGetDataById);

module.exports = router;
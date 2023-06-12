const express = require("express");
const { handlerGetDataById, handlerGetDataByIngredient, handlerGetRandomizedData } = require("../../app/v1/Recipe/handler");
const { handlerRegisterUser, handlerLoginUser, handlerUpdatePassword, handlerGenerateResetPasswordOTP,handlerVerifyResetPasswordOTP, handlerGenerateNewResetPassword, handlerGetDetailUser, handlerUpdateProfileUser, handlerUpdatePhotoProfile, handlerDeleteImageProfile } = require("../../app/v1/User/handler");
const authenticationToken = require("../../middleware/authenticationToken");

const { uploadSingleImageToStorage } = require("../../utils/uploadToGCS");
const multer = require("../../utils/multer");


const router = express.Router();


router.post("/auth/register", handlerRegisterUser);
router.post("/auth/login", handlerLoginUser);


router.post("/user/changepassword", authenticationToken, handlerUpdatePassword);
router.post("/user/otpgen", handlerGenerateResetPasswordOTP);
router.post("/user/otpver", handlerVerifyResetPasswordOTP);
router.post("/user/resetpassword", handlerGenerateNewResetPassword);


router.get("/user/detail", authenticationToken, handlerGetDetailUser);
router.put("/user/detail/update", authenticationToken, handlerUpdateProfileUser);
router.put("/user/detail/update/photo", authenticationToken, multer.single("image"),  uploadSingleImageToStorage, handlerUpdatePhotoProfile);
router.delete("/user/detail/update/photo/delete", authenticationToken, handlerDeleteImageProfile);

router.get("/recipe/random", handlerGetRandomizedData);
router.get("/recipe", handlerGetDataByIngredient);
router.get("/recipe/:id", handlerGetDataById);

module.exports = router;
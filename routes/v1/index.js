const express = require("express");
const { handlerGetDataById, handlerGetDataByIngredient, handlerGetRandomizedData } = require("../../app/v1/Recipe/handler");
const { handlerRegisterUser, handlerLoginUser } = require("../../app/v1/User/handler");


const router = express.Router();


router.post("/auth/register", handlerRegisterUser);
router.post("/auth/login", handlerLoginUser);
router.get("/recipe/random", handlerGetRandomizedData);
router.get("/recipe", handlerGetDataByIngredient);
router.get("/recipe/:id", handlerGetDataById);

module.exports = router;
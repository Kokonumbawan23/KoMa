const express = require("express");
const { handlerGetDataById, handlerGetDataByIngredient } = require("../../app/v1/Recipe/handler");


const router = express.Router();

router.get("/recipe", handlerGetDataByIngredient);
router.get("/recipe/:id", handlerGetDataById);

module.exports = router;
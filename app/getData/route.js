const express = require("express");
const { handlerGetData } = require("./handler");

const router = express.Router();

router.get("/", handlerGetData);

module.exports = router;
const express = require("express");
const { handlerGetData } = require("./handler");

const router = express.Router();

router.post("/", handlerGetData);

module.exports = router;
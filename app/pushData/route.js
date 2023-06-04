const express = require("express");
const { handlerGetData } = require("./handler");
const uploadImage = require("../../utils/multer");
const { uploadSingleImageToStorage } = require("../../utils/uploadToGCS");
const router = express.Router();

router.post("/", handlerGetData);

module.exports = router;
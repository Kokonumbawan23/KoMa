const Multer = require("multer");
const typeImage = ["image/png", "image/jpg", "image/jpeg"];

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 40 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!typeImage.includes(file.mimetype)){
        cb(new Error("Unsupported file type"), false);
    }
    cb(null, true);
  },
});

module.exports = multer;

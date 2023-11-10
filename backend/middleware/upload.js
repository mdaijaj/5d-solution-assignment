const multer = require("multer")
const path = require("path")
const location = path.join("documents")

var storage = multer.diskStorage({
  destination: "file_upload/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100mb
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG"
    ) {
      cb(null, true);
    } else {
      cb("Sorry, pick file ", false);
    }
  },
});
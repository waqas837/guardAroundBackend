var multer = require("multer");
var uuid = require("uuid");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = "public/images/";
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + file.originalname);
  },
});
module.exports = multer({
  storage: storage,
});

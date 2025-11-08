// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// store files in /images, keep original extension, use timestamp prefix to avoid name collisions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + file.fieldname + ext;
    cb(null, name);
  },
});

// file filter: accept only JPEG, PNG, GIF
function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/gif"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(null, false);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB limit

module.exports = upload;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // hashed by bcrypt
    imagePath: { type: String }, // e.g. /images/filename.ext
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

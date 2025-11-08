// routes/user.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const upload = require("../middleware/upload");
const Joi = require("joi");
const path = require("path");

// Validation schemas using Joi
const createSchema = Joi.object({
  fullName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[0-9]/, "digit")
    .pattern(/[\W_]/, "special")
    .required(),
});

const updateSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .optional(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .optional(),
});

// 1) POST /user/create
router.post("/create", async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: "Validation failed." });

    const { fullName, email, password } = req.body;

    // Check duplicate email
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: "Validation failed." });

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashed,
    });
    await user.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Validation failed." });
  }
});

// 2) PUT /user/edit
// expects JSON body with { email, fullName? , password? }
router.put("/edit", async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: "Validation failed." });

    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found." });

    if (fullName) user.fullName = fullName;
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Validation failed." });
  }
});

// 3) DELETE /user/delete
// expects JSON body { email }
router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(404).json({ error: "User not found." });

    const user = await User.findOneAndDelete({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found." });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "User not found." });
  }
});

// 4) GET /user/getAll
router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find({}, "fullName email password").lean();
    // return users array exactly as required
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred." });
  }
});

// 5) POST /user/uploadImage
// Form-Data fields: email (string), image (file)
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      // remove uploaded file if any
      if (req.file) {
        const fs = require("fs");
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: "User not found." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      if (req.file) {
        const fs = require("fs");
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: "User not found." });
    }

    // if user already has an imagePath set
    if (user.imagePath) {
      if (req.file) {
        const fs = require("fs");
        fs.unlinkSync(req.file.path); // remove new uploaded file
      }
      return res
        .status(400)
        .json({ error: "Image already exists for this user." });
    }

    // multer's fileFilter prevents invalid mimetypes by rejecting; but multer sets file to undefined when rejected.
    if (!req.file) {
      return res.status(400).json({
        error: "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    // Save relative path e.g. /images/filename.ext
    const relativePath = path
      .join("/images", req.file.filename)
      .replace(/\\/g, "/");
    user.imagePath = relativePath;
    await user.save();

    return res.status(201).json({
      message: "Image uploaded successfully.",
      filePath: relativePath,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
    });
  }
});

module.exports = router;

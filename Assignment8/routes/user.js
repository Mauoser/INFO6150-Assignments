const Joi = require("joi");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

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

router.post("/create", async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: "Validation failed." });

    const { fullName, email, password } = req.body;

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

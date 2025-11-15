const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/assignment8");

async function run() {
  const email = "john.doe@example.com";
  const newPassword = "NewStr0ng!";

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.log("User not found");
    return;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  console.log("Password updated successfully!");
  mongoose.disconnect();
}

run();

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  cart: [{ product: mongoose.Schema.Types.ObjectId, quantity: Number }],
  role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema);

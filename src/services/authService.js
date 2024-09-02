const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResetPasswordEmail } = require("./emailService");

exports.registerUser = async (
  first_name,
  last_name,
  email,
  password,
  age,
  role
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    age,
    role,
  });
  await newUser.save();
};

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await sendResetPasswordEmail(email, token);
  return true;
};

exports.resetPassword = async (email, token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== email) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    return true;
  } catch (error) {
    return false;
  }
};

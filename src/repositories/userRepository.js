const User = require("../models/user");

exports.findByEmail = async (email) => {
  return User.findOne({ email });
};

exports.createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
};

exports.updatePassword = async (email, newPassword) => {
  return User.updateOne({ email }, { password: newPassword });
};

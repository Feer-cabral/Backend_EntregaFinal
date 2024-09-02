const Message = require("../models/message");

exports.saveMessage = async (userId, message) => {
  const newMessage = new Message({
    user: userId,
    message,
  });
  await newMessage.save();
};

exports.getMessages = async () => {
  return Message.find().populate("user");
};

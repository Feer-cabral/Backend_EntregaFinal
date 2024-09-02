const Message = require("../models/message");

exports.saveMessage = async (messageData) => {
  const newMessage = new Message(messageData);
  await newMessage.save();
};

exports.findAll = async () => {
  return Message.find().populate("user");
};

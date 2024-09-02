const Message = require("../models/message");

// Página de chat
exports.chatPage = (req, res) => {
  res.render("chat");
};

// Enviar mensaje
exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  const newMessage = new Message({
    user: req.user._id,
    message,
  });
  await newMessage.save();
  res.redirect("/chat");
};

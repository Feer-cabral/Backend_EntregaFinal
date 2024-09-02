const Ticket = require("../models/ticket");

exports.createTicket = async (ticketData) => {
  const newTicket = new Ticket(ticketData);
  await newTicket.save();
};

exports.findAll = async () => {
  return Ticket.find();
};

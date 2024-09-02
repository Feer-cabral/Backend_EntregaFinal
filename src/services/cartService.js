const Product = require("../models/product");
const Ticket = require("../models/ticket");

exports.calculateTotalAmount = async (cart) => {
  const productIds = cart.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  return cart.reduce((total, item) => {
    const product = products.find(
      (p) => p._id.toString() === item.product.toString()
    );
    return total + product.price * item.quantity;
  }, 0);
};

exports.createTicket = async (amount, purchaser) => {
  const ticket = new Ticket({
    code: `TCK-${Date.now()}`,
    purchase_datetime: new Date(),
    amount,
    purchaser,
  });

  await ticket.save();
  return ticket;
};

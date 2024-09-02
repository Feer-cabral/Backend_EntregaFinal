const Product = require("../models/product");
const Ticket = require("../models/ticket");

// Página de carrito
exports.cartPage = async (req, res) => {
  const cart = req.user.cart || [];
  const productIds = cart.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  res.render("cart", { products, cart });
};

// Checkout
exports.checkout = async (req, res) => {
  const cart = req.user.cart || [];
  const totalAmount = cart.reduce((total, item) => {
    const product = products.find(
      (p) => p._id.toString() === item.product.toString()
    );
    return total + product.price * item.quantity;
  }, 0);

  const ticket = new Ticket({
    code: `TCK-${Date.now()}`,
    purchase_datetime: new Date(),
    amount: totalAmount,
    purchaser: req.user._id,
  });

  await ticket.save();
  req.user.cart = [];
  await req.user.save();

  // Enviar confirmación por email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: req.user.email,
    from: "Mi Tienda <feercabral32@gmail.com>",
    subject: "Confirmación de compra",
    text: `Tu compra ha sido realizada con éxito.\n\n
           Detalles del ticket:\n
           Código: ${ticket.code}\n
           Fecha: ${ticket.purchase_datetime}\n
           Total: ${totalAmount}\n`,
  };

  await transporter.sendMail(mailOptions);
  res.redirect("/purchase-success");
};

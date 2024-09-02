const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [{ product: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  img: String,
  code: String,
  stock: Number,
  category: String,
  status: { type: String, enum: ["activo", "inactivo"], default: "activo" },
  thumbnails: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Product", productSchema);

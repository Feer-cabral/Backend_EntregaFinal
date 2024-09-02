const Product = require("../models/product");
const User = require("../models/user");

// Página de perfil
exports.profilePage = (req, res) => {
  res.render("profile", { user: req.user });
};

// Añadir producto
exports.addProduct = async (req, res) => {
  const { title, description, price, code, stock, category, status } = req.body;
  const newProduct = new Product({
    title,
    description,
    price,
    code,
    stock,
    category,
    status,
    owner: req.user._id,
  });
  await newProduct.save();
  res.redirect("/profile");
};

// Página de tienda
exports.storePage = async (req, res) => {
  const products = await Product.find();
  res.render("store", { products });
};

// Añadir al carrito
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.redirect("/store");

  const cart = req.user.cart || [];
  cart.push({ product: productId, quantity });
  req.user.cart = cart;
  await req.user.save();

  res.redirect("/cart");
};

// Eliminar del catálogo
exports.removeFromCatalog = async (req, res) => {
  const { productId } = req.body;
  await Product.findByIdAndDelete(productId);
  res.redirect("/profile");
};

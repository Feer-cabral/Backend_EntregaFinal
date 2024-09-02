const Product = require("../models/product");

exports.createProduct = async (productData) => {
  const newProduct = new Product(productData);
  await newProduct.save();
};

exports.getAllProducts = async () => {
  return Product.find();
};

exports.getProductById = async (productId) => {
  return Product.findById(productId);
};

exports.deleteProduct = async (productId) => {
  await Product.findByIdAndDelete(productId);
};

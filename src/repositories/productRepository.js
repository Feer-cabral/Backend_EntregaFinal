const Product = require("../models/product");

exports.createProduct = async (productData) => {
  const newProduct = new Product(productData);
  await newProduct.save();
};

exports.findAll = async () => {
  return Product.find();
};

exports.findById = async (productId) => {
  return Product.findById(productId);
};

exports.deleteById = async (productId) => {
  return Product.findByIdAndDelete(productId);
};

const Cart = require("../models/cart");

// Función para crear un nuevo carrito
const createCart = async (cartData) => {
  try {
    const cart = new Cart(cartData);
    return await cart.save();
  } catch (error) {
    throw new Error("Error al crear el carrito: " + error.message);
  }
};

// Función para obtener un carrito por ID
const findById = async (cartId) => {
  try {
    return await Cart.findById(cartId).populate("product.product");
  } catch (error) {
    throw new Error("Error al obtener el carrito: " + error.message);
  }
};

// Función para actualizar un carrito por ID
const updateById = async (cartId, updateData) => {
  try {
    return await Cart.findByIdAndUpdate(cartId, updateData, {
      new: true,
    }).populate("product.product");
  } catch (error) {
    throw new Error("Error al actualizar el carrito: " + error.message);
  }
};

// Función para eliminar un carrito por ID
const deleteById = async (cartId) => {
  try {
    return await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    throw new Error("Error al eliminar el carrito: " + error.message);
  }
};

module.exports = {
  createCart,
  findById,
  updateById,
  deleteById,
};

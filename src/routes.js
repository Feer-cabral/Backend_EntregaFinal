const express = require("express");
const router = express.Router();

const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");
const messageController = require("./controllers/messageController");

router.get("/", authController.loginPage);

// Rutas de autenticación
router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/register", authController.registerPage);
router.post("/register", authController.register);
router.get("/forgot-password", authController.forgotPasswordPage);
router.post("/forgot-password", authController.sendRecoveryEmail);
router.get("/reset-password", authController.resetPasswordPage);
router.post("/reset-password", authController.resetPassword);
router.get("/logout", authController.logout);

// Rutas de productos
router.get("/profile", productController.profilePage);
router.post("/add-product", productController.addProduct);
router.get("/store", productController.storePage);
router.post("/store/add-to-cart", productController.addToCart);
router.post("/store/remove-from-catalog", productController.removeFromCatalog);

// Rutas de carritos
router.get("/cart", cartController.cartPage);
router.post("/cart/checkout", cartController.checkout);

// Rutas de mensajes
router.get("/chat", messageController.chatPage);
router.post("/chat/send-message", messageController.sendMessage);

module.exports = router;

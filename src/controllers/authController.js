const passport = require("passport");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Página de login
exports.loginPage = (req, res) => {
  res.render("login");
};

// Login
exports.login = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
});

// Página de registro
exports.registerPage = (req, res) => {
  res.render("register");
};

// Registrar usuario
exports.register = async (req, res) => {
  const { first_name, last_name, email, password, age, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    age,
    role,
  });
  await newUser.save();
  res.redirect("/login");
};

// Página de olvidar contraseña
exports.forgotPasswordPage = (req, res) => {
  res.render("forgotPassword");
};

// Enviar correo de recuperación
exports.sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.redirect("/forgot-password");

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: email,
    from: "Mi Tienda <feercabral32@gmail.com>",
    subject: "Recuperación de contraseña",
    text: `Recibimos una solicitud para recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla:\n\n
           http://${req.headers.host}/reset-password?token=${token}\n\n
           Si no solicitaste esta recuperación, ignora este mensaje.\n`,
  };

  await transporter.sendMail(mailOptions);
  res.redirect("/forgot-password");
};

// Página de restablecimiento de contraseña
exports.resetPasswordPage = (req, res) => {
  res.render("resetPassword", { token: req.query.token });
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  const user = await User.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.redirect("/reset-password");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.redirect("/login");
};

// Logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

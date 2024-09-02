require("dotenv").config({ path: "./.env.desarrollo" });
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectMongo = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./config/winston"); // Usa la configuración de Winston

const routes = require("./routes");
const { initializePassport } = require("./config/passport");
const swaggerJsdoc = require("./config/swagger");
const emailConfig = require("./config/email");

const app = express();

// Configuración de middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares para express-handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configuración de sesión
const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGO_URL, // Utiliza mongoUrl aquí
  collectionName: "sessions",
});

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
  })
);

// Inicialización de Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Configuración de rutas
app.use("/", routes);

// Configuración de Swagger
swaggerJsdoc(app);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => logger.info("Conectado a MongoDB"))
  .catch((err) => logger.error("Error al conectar a MongoDB", err));

// Configuración de email
emailConfig();

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.info(`Servidor corriendo en puerto ${PORT}`));

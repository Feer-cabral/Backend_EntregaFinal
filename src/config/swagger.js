const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

module.exports = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E-commerce API",
        version: "1.0.0",
        description: "Documentación API de e-commerce",
      },
    },
    apis: [path.join(__dirname, "../docs/**/*.yaml")],
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

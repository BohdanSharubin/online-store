const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Store REST API",
      version: "1.0.0",
      description:
        "API documentation for online-store (Node.js + Express + Mongoose)",
    },
    servers: [
      {
        url: "https://online-store-0g0e.onrender.com/",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description:
            "JWT token which automated stored in HTTP-Only cookie after sign in",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

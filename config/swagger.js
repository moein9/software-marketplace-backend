import swaggerJSDoc from "swagger-jsdoc";

const option = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "software market place app",
      description: "an application to sell/buy softwares",
      version: "1.0.0",
    },
  },
  servers: [{ url: "http://localhost:4000" }],
  apis: ["./routes/*.js"],
};

export const swaggerSpecs = swaggerJSDoc(option);

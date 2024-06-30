import express from "express";
import personRoutes from "./src/core/personRoutes";
import config from "./src/config";
import checkConnection from "./src/config/checkConnectionDb";
import knexConfig from "./src/config/knexfile";
import knex from "knex";

const app = express();
const db = knex(knexConfig);

const startServer = async () => {
  try {
    await checkConnection();

    app.use("/", personRoutes);

    app
      .listen(config.port, () => {
        console.log("[Server API] Server running at PORT: ", config.port);
      })
      .on("[Server API] Server error", (error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    console.error("[Gestion_Menage] Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

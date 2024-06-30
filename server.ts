import express from "express";
import personRoutes from "./src/core/routes/personnRoute";
import config from "./src/config";
import checkConnection from "./src/config/checkConnectionDb";

const app = express();

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

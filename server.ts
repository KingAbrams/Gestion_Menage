import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import personRoutes from "./src/core/routes/personRoute";
import config from "./src/config";
import checkConnection from "./src/config/checkConnectionDb";

const app = express();
const upload = multer();

checkConnection();

app.use(bodyParser.json());
app.use(upload.none());

app.use("/", personRoutes);

const server = app
  .listen(config.port, () => {
    console.log("[Server API] Server running at PORT: ", config.port);
  })
  .on("[Server API] Server error", (error) => {
    throw new Error(error.message);
  });

export default server;

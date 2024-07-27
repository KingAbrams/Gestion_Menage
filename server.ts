import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import personRoutes from "./src/core/routes/personRoute";
import config from "./src/config";
import checkConnection from "./src/config/checkConnectionDb";
import { connectRabbitMQ } from "./rabbitmq";

const app = express();
const upload = multer();

checkConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(upload.none());

app.use("/", personRoutes);

app
  .listen(config.port, async () => {
    console.log("[Server API] Server running at PORT: ", config.port);
    await connectRabbitMQ();
  })
  .on("[Server API] Server error", (error) => {
    throw new Error(error.message);
  });

import config from ".";
import { Pool } from "pg";
import PersonController from "../controllers/PersonController";
import { logger } from "./logger";

export const pool = new Pool(config.db);
const personController = new PersonController();

const checkConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    logger.info(`[Database] Connection successful: ${res.rows}`);
    // console.log("RES", res);
    personController.initializePersonDb();
  } catch (error) {
    logger.error("[Database] Connection error:", error);
  } finally {
    await pool.end();
  }
};

export default checkConnection;

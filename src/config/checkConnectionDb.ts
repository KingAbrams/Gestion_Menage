import config from ".";
import { Pool } from "pg";
import PersonController from "../controllers/PersonController";
import { logger } from "./logger";

const pool = new Pool(config.db);
const personController = new PersonController();

const checkConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
<<<<<<< Updated upstream
    logger.info("[Database] Connection successful:", res.rows);
=======
    const date = JSON.stringify(res.rows);
    logger.info(`[Database] Connection successful: ${date}`);

>>>>>>> Stashed changes
    personController.initializePersonDb();

    return res.rows;
  } catch (error) {
    logger.error("[Database] Connection error:", error);
  }
};

export default checkConnection;

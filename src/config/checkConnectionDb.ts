import config from ".";
import { Pool } from "pg";
import PersonController from "../controllers/PersonController";

const pool = new Pool(config.db);
const personController = new PersonController();

const checkConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("[Database] Connection successful:", res.rows);
    personController.initializePersonDb();
  } catch (error) {
    console.error("[Database] Connection error:", error);
  } finally {
    await pool.end();
  }
};

export default checkConnection;

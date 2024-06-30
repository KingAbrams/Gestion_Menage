import config from ".";
import { Pool } from "pg";

const pool = new Pool(config.db);

const checkConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("[Database] Connection successful:", res.rows);
  } catch (error) {
    console.error("[Database] Connection error:", error);
  } finally {
    await pool.end();
  }
};

export default checkConnection;

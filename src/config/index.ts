import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  db: {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
  },
};

export default config;

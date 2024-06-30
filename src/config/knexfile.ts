import knex from "knex";

const knexConfig = {
  client: "pg",
  connection: {
    user: "postgres",
    password: "motdepasse",
    database: "household_management",
    host: "localhost",
    port: 5432,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "../../migrations",
  },
};

const db = knex(knexConfig);

export default db;

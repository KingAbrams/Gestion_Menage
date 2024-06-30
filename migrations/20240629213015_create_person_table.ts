import type { Knex } from "knex";

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("person", (table) => {
    table.increments("id").primary();
    table.string("firstname").nullable();
    table.string("lastname").notNullable();
    table.date("birthday").notNullable();
    table.string("cin").nullable().unique();
    table.string("nationality").notNullable();
    table.string("linkWithChief").notNullable();
    table.string("job").nullable();
    table.string("otherSource").nullable();
    table.timestamps(true, true);
  });
};

const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("person");
};

export { up, down };

import type { Knex } from "knex";

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("person", (table) => {
    table.increments("id").primary();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("birthday").notNullable();
    table.string("cin").notNullable().unique();
    table.string("nationality").notNullable();
    table.string("linkWithChief").notNullable();
    table.string("job").notNullable();
    table.string("otherSource").notNullable();
    table.timestamps(true, true);
  });
};

const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("person");
};

export { up, down };

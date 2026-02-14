exports.up = function(knex) {
  return knex.schema.createTable('sales', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.decimal('revenue').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sales');
};
exports.up = function(knex) {
    return knex.schema.createTable('tb_comodo_portas', function(table) {
      table.increments('id_comodo_portas').primary();
      table.string('descricao_porta', 255).notNullable();
      table.boolean('status_porta').notNullable();
      table.string('senha_porta', 255).notNullable();
      table.integer('id_empresa_comodos').unsigned().notNullable();
      
      table.foreign('id_empresa_comodos').references('id_empresa_comodos').inTable('tb_empresa_comodos')
        .onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tb_comodo_portas');
  };
  
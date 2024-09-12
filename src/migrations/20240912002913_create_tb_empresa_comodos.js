exports.up = function(knex) {
    return knex.schema.createTable('tb_empresa_comodos', function(table) {
      table.increments('id_empresa_comodo').primary();
      table.string('nome_comodo');
      table.integer('tamanho_comodo');
      table.string('tipo_acesso');
      table.integer('id_empresa')
        .unsigned()
        .references('id_empresa')
        .inTable('tb_empresa')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tb_empresa_comodos');
  };
  
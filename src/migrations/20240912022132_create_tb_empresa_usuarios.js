exports.up = function(knex) {
    return knex.schema.createTable('tb_empresa_usuarios', function(table) {
      table.increments('id'); 
      table.integer('id_empresa').unsigned().notNullable(); 
      table.integer('id_usuario').unsigned().notNullable(); 
      

      table.foreign('id_empresa').references('id_empresa').inTable('tb_empresa').onDelete('CASCADE');
      table.foreign('id_usuario').references('id_usuario').inTable('id_usuario').onDelete('CASCADE');
  
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tb_empresa_usuarios');
  };
  
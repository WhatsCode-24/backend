const database = require('../config/database');
const table = 'tb_usuario';

module.exports = {
  find: async (params) => {
    var findParams = [];

    // adicionando parametros de busca ao array
    if (params.hasOwnProperty('id_usuario')) {
      findParams.push('tb_usuario.id_usuario = ' + params.id_usuario);
    }

    if (params.hasOwnProperty('cnpj')) {
      findParams.push('tb_fornecedor.cnpj = ' + params.cnpj);
    }

    if (params.hasOwnProperty('id_fornecedor')) {
      findParams.push('tb_usuario.id_fornecedor = ' + params.id_fornecedor);
    }

    const query = database(table)
      .select('tb_usuario.*', 'tb_fornecedor.*')
      .join('tb_fornecedor', 'tb_fornecedor.id_fornecedor', '=', 'tb_usuario.id_fornecedor')
      .first();

    if (Object.keys(findParams).length > 0) {
      query.whereRaw(findParams.join(' AND '));
    }

    return await query;
  },

  findAllUserByIdFornecedor: async (id_fornecedor) => {
    const query = database(table)
      .select('tb_usuario.*')
      .join('tb_fornecedor', 'tb_fornecedor.id_fornecedor', '=', 'tb_usuario.id_fornecedor')
      .where('tb_usuario.id_fornecedor', id_fornecedor);

    return await query;
  },

  suspenderUser: async (codigo_cliente_omie) => {
    const query = database(table)
      .join('tb_fornecedor_omie', 'tb_fornecedor_omie.id_fornecedor', '=', 'tb_usuario.id_fornecedor')
      .where('tb_fornecedor_omie.codigo_cliente_omie', codigo_cliente_omie)
      .update({ id_status_registro: 2 });

    return await query;
  },

  suspenderUserByIdUsuario: async (id_usuario) => {
    const query = database(table).where('tb_usuario.id_usuario', id_usuario).update({ id_status_registro: 2 });

    return await query;
  },

  suspenderUserByIdUsuarioEmMassa: async (id_usuario) => {
    // where in
    const query = database(table).whereIn('tb_usuario.id_usuario', id_usuario).update({ id_status_registro: 2 });
    console.log(query.toString());
    return await query;
  },

  ativarUserByIdUsuarioEmMassa: async (id_usuario) => {
    // where in
    const query = database(table).whereIn('tb_usuario.id_usuario', id_usuario).update({ id_status_registro: 1 });

    return await query;
  },

  ativarUser: async (codigo_cliente_omie) => {
    const query = database(table)
      .join('tb_fornecedor_omie', 'tb_fornecedor_omie.id_fornecedor', '=', 'tb_usuario.id_fornecedor')
      .where('tb_fornecedor_omie.codigo_cliente_omie', codigo_cliente_omie)
      .update({ id_status_registro: 1 });

    return await query;
  },
};

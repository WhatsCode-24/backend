const database = require("../config/database");
const table_usuario_v1 = "tb_usuario";
const table_usuario_financeiro = "tb_usuario_financeiro";

module.exports = {
  async login(params = null) {
    const result = database(table_usuario_v1)
      .select(["tb_usuario.*", "tb_fornecedor.nome_fantasia", "tb_fornecedor.razao_social", "tb_fornecedor.cnpj"])
      .leftJoin("tb_fornecedor", "tb_fornecedor.id_fornecedor", "=", "tb_usuario.id_fornecedor")
      .where({
        ["tb_usuario.email"]: params.email,
        ["tb_usuario.senha"]: params.senha,
      })
      .first();

    return await result;
  },

  async loginFinanceiro(params = null) {
    const result = await database(table_usuario_financeiro)
      .select(["tb_usuario_financeiro.*"])
      .where({
        ["tb_usuario_financeiro.email"]: params.email,
        ["tb_usuario_financeiro.senha"]: params.senha,
      })
      .first();

    return result;
  },
};

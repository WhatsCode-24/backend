const database = require("../config/database");
const table = "tb_usuario";

module.exports = {
  async login(params = null) {
    const result = await database(table)
      .select("*")
      .where({
        ["email_usuario"]: params.email,
        ["password_usuario"]: params.password
      })
      .first();
      
    return result;
  }
};

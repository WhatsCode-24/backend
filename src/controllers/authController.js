const jwt = require("jsonwebtoken");
const authRepository = require('../repositories/authRepository');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.login({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas ou usuário não é admin." });
    }

    // Aqui você pode adicionar verificação de senha se estiver usando bcrypt
    // const validPassword = await bcrypt.compare(password, user.password_usuario);
    // if (!validPassword) return res.status(401).json({ message: "Credenciais inválidas." });

    const token = jwt.sign(
      { id_usuario: user.id_usuario, tipo_usuario: user.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao tentar realizar login." });
  }
};

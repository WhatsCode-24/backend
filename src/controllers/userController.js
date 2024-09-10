const { body, param, validationResult } = require('express-validator');
const userRepository = require('../repositories/userRepository');

exports.createUser = [
  body('nome_usuario').isString().trim().escape(),
  body('cpf_usuario').isString().trim().escape(),
  body('email_usuario').isEmail().normalizeEmail(),
  body('telefone_usuario').isString().trim().escape(),
  body('password_usuario').isString().trim(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userData = {
        nome_usuario: req.body.nome_usuario,
        cpf_usuario: req.body.cpf_usuario,
        email_usuario: req.body.email_usuario,
        telefone_usuario: req.body.telefone_usuario,
        password_usuario: req.body.password_usuario,
      };

      const [userId] = await userRepository.create(userData);

      const newUser = await userRepository.find({ id_usuario: userId });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  }
];

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.getUserById = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await userRepository.find({ id_usuario: req.params.id });

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
];

exports.updateUser = [
  body('nome_usuario').optional().isString().trim().escape(),
  body('cpf_usuario').optional().isString().trim().escape(),
  body('email_usuario').optional().isEmail().normalizeEmail(),
  body('telefone_usuario').optional().isString().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedUser = {
        nome_usuario: req.body.nome_usuario,
        cpf_usuario: req.body.cpf_usuario,
        email_usuario: req.body.email_usuario,
        telefone_usuario: req.body.telefone_usuario,
      };

      const affectedRows = await userRepository.update(req.params.id, updatedUser);

      if (affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

      const user = await userRepository.find({ id_usuario: req.params.id });
      res.json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }
];

exports.deleteUser = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await userRepository.delete(req.params.id);

      if (affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
];

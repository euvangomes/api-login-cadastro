const express = require('express');
const bcrypt = require('bcrypt');
const connect = require('../database/conn');
const router = express.Router();

const resetPass = async (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.password;
  const connection = await connect();
  const [results] = await connection.execute('SELECT * FROM tokens WHERE token = ?', [token]);
  if (results.length === 0) {
    return res.status(400).send('Token inválido, tente novamente.');
  }
  const email = results[0].email;
  const [userResults] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  if (userResults.length === 0) {
    return res.status(400).send('Email não encontrado, por favor tente novamente,');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 100);
  await connection.execute('UPDATE usuarios SET senha = ? WHERE email = ?', [hashedPassword, email]);
  await connection.execute('DELETE FROM tokens WHERE token = ?', [token]);
  res.send('Senha atualizada com sucesso!!');
};

router.post('/redefinir', resetPass);

module.exports = router;
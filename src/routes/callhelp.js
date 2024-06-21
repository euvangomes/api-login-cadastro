const express = require('express');
const crypto = require('crypto');
const connect = require('../database/conn');
const emailSender = require('../components/mail-sender');
const router = express.Router();

const helprouter = async (req, res) => {
  const email = req.body.email;
  const connection = await connect();
  const [results] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  if (results.length === 0) {
    return res.status(400).send('Usuário não encontrado.');
  }
  const token = crypto.randomBytes(20).toString('hex');
  await connection.execute('INSERT INTO tokens (email, token) VALUES (?, ?)', [email, token]);
  await emailSender(email, token);
  console.log(`Token para ${email}: ${token}`);
  res.status(200).send('Token enviado com sucesso!!');
};

router.post('/recuperar', helprouter);

module.exports = router;
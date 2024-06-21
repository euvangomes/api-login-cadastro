const express = require('express');
const bcrypt = require('bcrypt');
const connect = require('../database/conn');
const router = express.Router();
const saltRounds = 100;

const regisUser = async (req, res) => {
    let { name, username, celular, email, password } = req.body;
    password = await bcrypt.hash(password, saltRounds);
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE email = ? OR usuario = ?', [email, username]);
    if (rows.some(row => row.email === email && row.usuario === username)){
        return res.status(401).send("E-mail e usuário já existente!");
    }else if (rows.some(row => row.email === email)){
        return res.status(401).send("Este e-mail já está sendo utilizado!");
    }else if(rows.some(row => row.usuario === username)){
        return res.status(401).send("Este usuário já está sendo utilizado!");
    }else{
        await connection.query('INSERT INTO usuarios (nome, celular, email, usuario, senha) VALUES (?, ?, ?, ?, ?)', [name, celular, email, username, password]);
        res.status(200).send('Usuário registrado com sucesso!');
    }
};

router.post('/cadastro', regisUser);

module.exports = router;

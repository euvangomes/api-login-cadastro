const express = require('express');
const bcrypt = require('bcrypt');
const connect = require('../database/conn');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const toString = require('../middlewares/to-string');
const router = express.Router();
// Configuração da sessão
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 60 * 60 * 1000 // 1 hora
    }
}));
const logUser = [
    // Validação de entrada
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        // Verifica os resultados da validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const connection = await connect();
        const [results] = await connection.execute('SELECT * FROM usuarios WHERE usuario = ?', [username]);
        if (results.length > 0){
            const match = await bcrypt.compare(password, results[0].senha);
            if (match) {
                req.session.user = { username: username };
                return res.status(200).send("Login realizado com sucesso!");
            } else {
                return res.status(401).send("Senha incorreta!");
            }
        } else {
            return res.status(401).send("Usuário não encontrado!");
        }
    }
];
// Rota de login
router.post('/login', toString, logUser);

// Middleware de autenticação
const authenticateSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

// Rota que requer autenticação
router.get('/home', authenticateSession, (req, res) => {
    res.send("Bem-vindo à página inicial!");
});

module.exports = router;

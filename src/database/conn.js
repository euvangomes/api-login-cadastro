const mysql = require('mysql2/promise');
require('dotenv').config();
// Cria o pool
const pool = mysql.createPool({
    host: process.env.HOST_URL,
    port: process.env.SERVICE_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    ssl: {
        rejectUnauthorized: false,
        //SSL se requerido.
        ca: process.env.SSL_CA_CERTIFICATE
    }
});
// Obtém a conexão com o banco.
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexão obtida do pool!");
        return connection;
    } catch (error) {
        console.error("Erro ao obter conexão do pool:", error.message);
        throw error;
    }
}

module.exports = getConnection;

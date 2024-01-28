const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function getConnection() {
  const connection = await mysql.createConnection({
    port: Number.parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return connection;
}

module.exports = getConnection


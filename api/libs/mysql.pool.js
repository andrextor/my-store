const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  port: Number.parseInt(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
});


module.exports = pool


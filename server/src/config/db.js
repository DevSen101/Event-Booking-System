// src/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection immediately
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
  } else {
    console.log('✅ MySQL Connected!');
    connection.release(); // release connection back to pool
  }
});

// Export promise-based pool
module.exports = pool.promise();

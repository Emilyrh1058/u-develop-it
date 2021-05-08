const mysql = require('mysql2');

// CONNECT TO DATABASE
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Salemcaiman1619!',
    database: 'election'
  },
);


module.exports = db;
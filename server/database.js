const mysql = require('mysql2') // ou mysql

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', //admin for desktop
  password: 'password',
  database: 'kogumine-db'
})

module.exports = db

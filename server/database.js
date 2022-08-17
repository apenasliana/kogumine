const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'kogumine-db',
})

module.exports = db
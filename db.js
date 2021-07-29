const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "D@niel18011998",
    database: "avaliacao"
});

module.exports.connection = connection;
const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "D@niel18011998",
    database: "jaka_pdv_DB"
});

module.exports.connection =  connection;



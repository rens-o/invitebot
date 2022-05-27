const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

connection.connect(err => {
    if (err) return console.log("Error:", err);

    console.log('Database: Connected to MySQL...');
});

module.exports = connection;
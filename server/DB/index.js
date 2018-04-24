const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'slacker'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected to mySQL database');
});
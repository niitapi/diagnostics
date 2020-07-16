
var mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});



// var promise = require('bluebird');
// const config = require('../config');
// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// var pgp = require('pg-promise')(options);
// const connectionString = process.env.DATABASE_URL || config.DB_CONNECTION_STRING;
// var db = pgp(connectionString);
// var sco; // shared connection object

// db.connect()
//     .then(obj => {
//         sco = obj;
//         sco.client.on('notification', data => {
//             console.log('Received:', data);
//             // data.payload = 'my payload string'
//         });
//         return sco.none('LISTEN $1~', 'my-channel');
//     })
//     .catch(error => {
//         console.log('Error:', error);
//     })
//     .finally(() => {
//         if (sco) {
//             sco.done(); // releasing the connection back to the pool
//         }
//     });
module.exports = pool;



const Pool = require("pg-pool");
// const mysql = require('mysql2');
require("dotenv").config();
const Sequelize = require("sequelize").Sequelize;

let sequelize;
// if (process.env.URI) {
//   sequelize = new Sequelize(process.env.URI);
// } else {
//   sequelize = new Sequelize(process.env.DB, process.env.DBU, process.env.DBPD,  {
//     host: process.env.DBH,
//     dialect: "postgres",
//     ssl: true,
//   });
// }

// // mysql
// const sequelize = new Sequelize('database', 'username', 'password', {
//   dialect: 'mysql',
//   dialectOptions: {
//     // Your mysql2 options here
//   },
// });

// mysql
if (process.env.URI) {
  sequelize = new Sequelize(process.env.URI);
} else {
  sequelize = new Sequelize(process.env.DB, process.env.DBU, process.env.DBPD,  {
    host: process.env.DBH,
    dialect: "mysql",
    ssl: true,
  });
}

// pool-db
// const pool = new mysql.createConnection({
//   database: process.env.DB,
//   user: process.env.DBU,
//   host: process.env.DBH,
//   port: process.env.DBP,
//   password: process.env.DBPD,
// })

const pool = new Pool({
  database: process.env.DB,
  user: process.env.DBU,
  host: process.env.DBH,
  port: process.env.DBP,
  password: process.env.DBPD,
});

module.exports = { pool };

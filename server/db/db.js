const Pool = require("pg-pool");
const mysql = require("mysql");

require("dotenv").config();

// psql db
const pool = new Pool({
  database: process.env.DB,
  user: process.env.DBU,
  host: process.env.DBH,
  port: process.env.DBP,
  password: process.env.DBPD,
});

const mysqlObj = {
  connection: mysql.createConnection({
    host: process.env.DBH,
    user: process.env.DBU,
    password: process.env.DBPD,
    database: process.env.DB,
    port: process.env.DBPM,
  }),
  pool: mysql.createPool({
    connectionLimit: 100, //important
    host: process.env.DBH,
    user: process.env.DBU,
    password: process.env.DBPD,
    database: process.env.DB,
    port: process.env.DBPM,
    debug: false,
  }),
};

const mySqlConnect = () => {
  // validate mysql connection
  mysqlObj.connection.connect(function (err) {
    if (err) console.log(err);
    console.log("connected!");
  });
};
mySqlConnect();

module.exports = { pool, mysqlObj };

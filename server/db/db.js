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


// connect via query()
// const mySqlQuery = () => {
//   mysqlObj.connection.query("select * from scores", (err, result) => {
//     if (err) console.log(err);
//     console.log(result[0]);
//   });
// };
// mySqlQuery();


// connect via getConnection()
// const mySqlGetConnection = () => {
//   mysqlObj.pool.getConnection((err, pool) => {
//     if (err) console.log(err);
//     pool.query("select * from users left join scores on users.user_id = scores.u_id order by user_id desc", (err, result) => {
//       return err ? console.log(err) : result.forEach(r=>{
//         const {user_id,display_name,best,average} = r;
//         console.log({user_id,display_name,best,average})
//       });
//     });
//   });
// };
// mySqlGetConnection();w
module.exports = { pool, mysqlObj };

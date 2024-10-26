// process.argv.forEach(function (val, index, array) {
//   console.log(index+1 + ': ' + val);
// });
const Pool = require("pg-pool");
// const mysql = require("mysql2");
require("dotenv").config();
const Sequelize = require("sequelize").Sequelize;
let sequelize
// psql
if (process.env.URI) {
  sequelize = new Sequelize(process.env.URI,  {
    host: process.env.DBH,
    dialect: "postgres",
    ssl: true,
  });
} else {
  sequelize = new Sequelize(process.env.DB, process.env.DBU, process.env.DBPD,  {
    host: process.env.DBH,
    dialect: "postgres",
    ssl: true,
  });
}
// mysql
// if (process.env.URI) {
//   sequelize = new Sequelize(process.env.URI);
// } else {
//   sequelize = new Sequelize(process.env.DB, process.env.DBU, process.env.DBPD,  {
//     host: process.env.DBH,
//     dialect: "mysql",
//     ssl: true,
//   });
// }
// async function inserRow(table,name,email,pw){
// try{
//   await pool.promise().query(`insert into ${table}(display_name,email,password) values(?,?,?);`,[name,email,pw])
// }
// catch(err){
//   if(err) throw new Error(err)
// }
// }
// async function tableExists(pool,tableName,dbName) {
//   try {
//       // const query = `select table_name from information_schema.tables where table_schema = ${dbName} and table_name = ${tableName};`;
//       let res = await pool.promise().query(`select table_name from information_schema.tables where table_schema = ? and table_name = ?;`,[dbName,tableName]);
//       result = res[0][0]
//       console.log(result)
//       tname = result['TABLE_NAME']
//       console.log(tname)

//       if(/users/.test(tname)){
//         console.log('regex pass')
//         await inserRow(tname,'kyle','kyle@kyle','kyle321')
//       }
//       return true;
//   } catch (err) {
//       if(err)return false
//   }
// }
// function ensureDb(db){
// const dildos = 'dildos'
// return db !== dildos ? dildos : db
// }


const poolConfig = {
  database: process.env.DB,
  user: process.env.DBU,
  host: process.env.DBH,
  port: process.env.DBP,
  password: process.env.DBPD,
  ssl:{
    rejectUnauthorized:false,
  }
};
// const pool = mysql.createPool(poolConfig)
// testmysql()
const pool = new Pool(poolConfig)
// async function testmysql() {
//   let ok = await tableExists(pool,'users',ensureDb(poolConfig.database))
//   if(!ok){console.log('table does not exist')} else {console.log('table exists. you pass')}
//   process.exit(0)

// }

module.exports = { pool };

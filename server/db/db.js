const Pool = require("pg-pool");
require("dotenv").config();
const Sequelize = require("sequelize").Sequelize;

let sequelize;
if (process.env.URI) {
  sequelize = new Sequelize(process.env.URI);
} else {
  sequelize = new Sequelize(process.env.DB, process.env.DBU, process.env.DBPD,  {
    host: process.env.DBH,
    dialect: "postgres",
    ssl: true,
  });
}

// psql db
const pool = new Pool({
  database: process.env.DB,
  user: process.env.DBU,
  host: process.env.DBH,
  port: process.env.DBP,
  password: process.env.DBPD,
});

module.exports = { pool };

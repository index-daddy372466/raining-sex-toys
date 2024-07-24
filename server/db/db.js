const Pool = require("pg-pool");
require("dotenv").config();

// psql db
const pool = new Pool({
  database: process.env.DB,
  user: process.env.DBU,
  host: process.env.DBH,
  port: process.env.DBP,
  password: process.env.DBPD,
});


module.exports = { pool };

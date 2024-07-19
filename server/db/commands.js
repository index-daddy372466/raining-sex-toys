const pool = require("./db.js").pool;
const { mysqlObj } = require("./db.js");
class QueryCommand {
  //constructor
  constructor(framework, id, email) {
    this.framework = framework;
    this.id = id;
  }

  // statics
  async getUserById() {
    if (this.framework == "mysql") {
      mysqlObj.connection.query(
        "select * from users where user_id=?",
        this.id,
        (err, result) => {
          let data = JSON.parse(JSON.stringify(result));
          console.log(data);
          if (err) console.log(err);
          return data;
        }
      );
    } else if (this.framework == "psql") {
      let found = await pool.query(`select * from users where user_id=$1`, [
        this.id,
      ]);
      return !found ? console.log("psql - no users found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
  }
  async getUsersByEmail() {
    if (this.framework == "mysql") {
      mysqlObj.connection.query(
        `select * from users where email = ?`,
        this.email,
        (err, found) => {
          return err ? console.log(err) : found;
        }
      );
    } else if (this.framework == "psql") {
      let found = await pool.query(`select * from users where email = $1`, [
        this.email,
      ]);
      return !found ? console.log("psql - no users found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
  }
}

module.exports = QueryCommand;

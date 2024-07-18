const pool = require("./db.js").pool;
const { mysqlObj } = require("./db.js").mysqlObj;
 class QueryCommand {
  //constructor
  constructor(framework, id) {
    this.id = id;
  }

  // statics
  static async getUsersById(framework, id) {
    if (framework == "mysql") {
      mysqlObj.connection.query(
        `select * from users where id = ?`,
        id,
        (err, found) => {
          return err ? console.log(err) : found;
        }
      );
    } else if (framework == "psql") {
      let found = await pool.query(`select * from users where id = $1`, [id]);
      return !found ? console.log("psql - no users found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
    return new QueryCommand(id);
  }
}

module.exports = QueryCommand;
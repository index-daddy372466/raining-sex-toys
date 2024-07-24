const pool = require("./db.js").pool;
class QueryCommand {
  //constructor
  constructor(framework, id, email) {
    this.framework = framework;
    this.id = id;
  }

  async getUserById() {
if (this.framework == "psql") {
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
  async postScore() {
    if (this.framework == "psql") {
      // method
      let updated = await pool.query(
        `insert into scores(best,average,u_id) values(0,0,$1)`,
        [this.id]
      );
      try {
        return !updated ? console.log('psql - insert failure') : console.log('insert complete')
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}

module.exports = QueryCommand;

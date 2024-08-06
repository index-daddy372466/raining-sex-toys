const pool = require("./db.js").pool;

// get scores
class GetUsers {
  constructor(framework) {
    this.framework = framework;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      try {
        let users = await pool.query(
          "select * from users order by user_id asc"
        );
        return !users.rows ? new Error("wrong input") : users.rows;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get score by user ID
class GetUserById {
  //constructor
  constructor(framework, id) {
    this.framework = framework;
    this.id = id;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      let found = await pool.query(`select * from users where user_id=$1`, [
        this.id,
      ]);
      return !found ? console.log("psql - no users found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get user by email
class GetUserByEmail {
  //constructor
  constructor(framework, email) {
    this.framework = framework;
    this.email = email;
  }
  async executeQuery() {
    if (this.framework == "psql") {
      let found = await pool.query(`select * from users where email = $1`, [
        this.email,
      ]);
      return !found ? console.log("psql - no users found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get scores
class GetScores {
  constructor(framework) {
    this.framework = framework;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      try {
        let scores = await pool.query("select * from scores order by u_id asc");
        return !scores.rows ? new Error("wrong input") : scores.rows;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get scores by u_ID
class GetScoresByUserId {
  //constructor
  constructor(framework, id) {
    this.framework = framework;
    this.id = id;
  }
  async executeQuery() {
    if (this.framework == "psql") {
      let found = await pool.query(
        `select * from scores where u_id=$1 order by score_id desc`,
        [this.id]
      );
      return !found ? console.log("psql - no scores found") : found.rows;
    } else {
      throw new Error("No framework detected");
    }
  }
}
// update scoreboard by user ID
class UpdateScoreByUserId {
  constructor(framework, best, score, id) {
    this.framework = framework;
    this.best = best;
    this.score = score;
    this.id = id;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      // method

      try {
        let average = await pool.query(
          "select (cast(sum(score) + $1 as integer) / (count(score)+1)) as avg from scores where u_id=$2",
          [this.score, this.id]
        );
        let avg =
          average.rows[0].avg == null ? this.score : +average.rows[0].avg;
        let updateScore = await pool.query(
          `insert into scores(best,average,u_id,score) values($1,$2,$3,$4)`,
          [this.best, avg, this.id, this.score]
        );

        if (!updateScore) console.log("error on insert");
        return this.score;
      } catch (err) {
        if (err) console.log(err);
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get scores within a certain range
class GetScoresSpectrum {
  constructor(framework, id, from, to) {
    this.framework = framework;
    this.id = id;
    this.from = from;
    this.to = to;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      try {
        let scores = await pool.query(
          "select * from scores where u_id=$1 and score <= $2 and score >= $3",
          [this.id, this.to, this.from]
        );
        return !scores.rows ? new Error("wrong input") : scores.rows;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get scores within a certain range
class GetBestScore {
  constructor(framework, id) {
    this.framework = framework;
    this.id = id;
  }

  async executeQuery() {
    if (this.framework == "psql") {
      try {
        let scores = await pool.query(
          "select * from scores where u_id=$1 order by score desc",
          [this.id]
        );
        return !scores.rows ? new Error("wrong input") : scores.rows[0];
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// get worst score
class GetWorstScore {
  constructor(framework, id) {
    this.framework = framework;
    this.id = id;
  }
  
  async executeQuery() {
    if (this.framework == "psql") {
      try {
        let scores = await pool.query(
          "select * from scores where u_id=$1 order by score asc",
          [this.id]
        );
        return !scores.rows ? new Error("wrong input") : scores.rows.length > 1 ? scores.rows[0] : scores.rows.length + ' score documented (best)';
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}
// update account in settings
class UpdateAccount {
  constructor(framework, id, type) {
    this.framework = framework;
    this.id = id;
    this.type = type;
  }
  async executeQuery() {
    if (this.framework == "psql") {
      try {
        console.log(this.type)
        if(this.type.password!=undefined){
          let updated = await pool.query(`update users set ${Object.keys(this.type)[0]} = $1 where user_id = $2`,[this.type.password,this.id])
        }
        else{
        // method
        let updated = await pool.query(`update users set ${Object.keys(this.type)[0]} = $1 where user_id = $2`,[Object.values(this.type)[0],this.id])
        }
         
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No framework detected");
    }
  }
}

module.exports = {
  GetWorstScore,
  GetBestScore,
  GetScoresSpectrum,
  GetUsers,
  GetScores,
  GetScoresByUserId,
  GetUserById,
  GetUserByEmail,
  UpdateScoreByUserId,
  UpdateAccount
};

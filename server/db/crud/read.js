const express = require("express");
const router = express.Router();
const { mysqlObj, pool } = require("../db.js");
const pg = require("../db.js").pool;
const QueryCommand = require("../commands.js");

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("client/test"));

// read user/scores data - mysql
router.route("/mysql/review/:data").get((req, res) => {
  const { data } = req.params;
  if (/scores/i.test(data)) {
    let scores = connection.query("select * from scores", (err, result) => {
      return err ? console.log(err) : res.json({ scores: result });
    });
  } else if (/users/i.test(data)) {
    let users = mysqlObj.connection.query(
      "select * from users",
      (err, result) => {
        return err ? console.log(err) : res.json({ users: result });
      }
    );
  } else {
    res.send("not recognized");
  }
});

// read user/scores data - psql
router.route("/psql/review/:data").get(async (req, res) => {
  const { data } = req.params;
  if (/scores/i.test(data)) {
    let scores = await pg.query("select * from scores");
    return !scores.rows
      ? new Error("wrong input")
      : res.json({ scores: scores.rows });
  } else if (/users/i.test(data)) {
    let users = await pg.query("select * from users");
    return !users.rows
      ? new Error("wrong input")
      : res.json({ users: users.rows });
  } else {
    res.send("not recognized");
  }
});

// get user by id - psql
router.route("/psql/review/:data/:id").get(async (req, res) => {
  const { data, id } = req.params;

  if (/scores/i.test(data)) {
  } else if (/users/i.test(data)) {
    let getUser = new QueryCommand("psql", id);
    let found = await getUser.getUserById();
    return found.length < 1
      ? res.send("no users found")
      : res.json({ data: found });
  } else {
    res.send("not recognized");
  }
});
// get user by id - mysql
router.route("/mysql/review/:data/:id").get(async(req, res) => {
  const { data, id } = req.params;

  if (/scores/i.test(data)) {
  } else if (/users/i.test(data)) {
    mysqlObj.connection.query(
      "select * from users where user_id=?",
      id,
      (err, result) => {
        let data = JSON.parse(JSON.stringify(result));
        return err ? console.log(err) : res.json({ data: data });
      }
    );
  } else {
    res.send("not recognized");
  }
});

// get user by email - psql
router.route("/psql/review/:data/:email").get((req, res) => {
  const { data, email } = req.params;
  if (/scores/i.test(data)) {
  } else if (/users/i.test(data)) {
  } else {
    res.send("not recognized");
  }
});
// get user by email - mysql
router.route("/mysql/review/:data/:email").get((req, res) => {
  const { data, email } = req.params;
  if (/scores/i.test(data)) {
  } else if (/users/i.test(data)) {
  } else {
    res.send("not recognized");
  }
});

module.exports = router;

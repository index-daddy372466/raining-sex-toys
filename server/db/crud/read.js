const express = require("express");
const router = express.Router();
const { connection, pool } = require("../db.js").mysqlObj;
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
    let users = connection.query("select * from users", (err, result) => {
      return err ? console.log(err) : res.json({ users: result });
    });
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

router.route("/psql/review/:data/:id").get(async (req, res) => {
  const { data, id } = req.params;
  if (/scores/i.test(data)) {
    let getUserById = new QueryCommand("mysql", 1);
    res.json({ output: getUserById });
  } else if (/users/i.test(data)) {
    let getUserById = new QueryCommand("psql", 1);
    res.json({ output: getUserById });
  } else {
    res.send("not recognized");
  }
});
module.exports = router;

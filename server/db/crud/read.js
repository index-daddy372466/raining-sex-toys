require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("../db.js").pool;
const QueryCommand = require("../commands.js");
const path = require("path");

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// read user/scores data - psql
router.route("/psql/review/scores").get(async (req, res) => {
  const { data } = req.params;

  try {
    let scores = await pg.query("select * from scores");
    return !scores.rows
      ? new Error("wrong input")
      : res.json({ scores: scores.rows });
  } catch (err) {
    throw err;
  }
});

router.route("/psql/review/users").get(async (req, res) => {
  const { data } = req.params;

  try {
    let users = await pg.query("select * from users");
    return !users.rows
      ? new Error("wrong input")
      : res.json({ users: users.rows });
  } catch (err) {
    throw err;
  }
});

// get user by id - psql
router.route("/psql/review/scores/:id").get(async (req, res) => {
  const { id } = req.params;

  try {
    let getScores = new QueryCommand("psql", id);
    let found = await getScores.getScoresByUserId();
    return found.length < 1
      ? res.json({data:"no scores found"})
      : res.json({ data: found, attempts: found.length });
  } catch (err) {
    throw err;
  }
});

// get user by id - psql
router.route("/psql/review/users/:id").get(async (req, res) => {
  const { id } = req.params;

  try {
    let getUser = new QueryCommand("psql", id);
    let found = await getUser.getUserById();
    return found.length < 1
      ? res.send("no users found")
      : res.json({ data: found });
  } catch (err) {
    throw err;
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

module.exports = router;

require("dotenv").config();
const salt = 11;
let bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pg = require("../db.js").pool;
const { checkAuthenticated } = require("../../lib/auth.config.js");
const {
  GetUserByEmail,
  GetScoresByUserId,
  GetScores,
  GetUsers,
  GetUserById,
} = require("../commands.js");

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// read user/scores data - psql
router.route("/psql/review/scores").get(async (req, res) => {
  try {
    let scores = new GetScores("psql");
    let found = await scores.executeQuery();
    return found.length < 1
      ? res.status(401).send("Cannot reach information")
      : res.json({ scores: found });
  } catch (err) {
    throw err;
  }
});

// api to post new update
router.route("/set-aside").post(checkAuthenticated, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  req.session.aside = req.body;
  res.json(req.body);
});

// get all users
router.route("/psql/review/users").get(checkAuthenticated, async (req, res) => {
  try {
    let scores = new GetUsers("psql");
    let found = await scores.executeQuery();
    return found.length < 1
      ? res.status(404).send("Cannot reach information")
      : res.json({ users: found });
  } catch (err) {
    throw err;
  }
});

// get user by id - psql
router.route("/psql/review/scores/:id").get(async (req, res) => {
  const { id } = req.params;

  try {
    let getScores = new GetScoresByUserId("psql", id);
    let found = await getScores.executeQuery();
    return found.length < 1
      ? res.json({ data: "no scores found" })
      : res.json({ data: found, attempts: found.length });
  } catch (err) {
    throw err;
  }
});

// get user by id - psql
router
  .route("/psql/review/users/:id")
  .get(checkAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
      if (id == req.session.passport.user.user_id) {
        let getUser = new GetUserById("psql", id);
        let found = await getUser.executeQuery();
        return found.length < 1
          ? res.send("no users found")
          : res.json({ data: found });
      } else {
        res.json({ err: "Incorrect query. Try again." });
      }
    } catch (err) {
      throw err;
    }
  });

// get user by email - psql
router
  .route("/psql/review/:email")
  .get(checkAuthenticated, async (req, res) => {
    const { email } = req.params;

    try {
      let getUserByEmail = new GetUserByEmail("psql", email);
      let found = await getUserByEmail.executeQuery();
      return found.length < 1
        ? res.send("no users found")
        : res.json({ data: found });
    } catch (err) {
      throw err;
    }
  });

module.exports = router;

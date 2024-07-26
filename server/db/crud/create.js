const express = require("express");
const router = express.Router();
const pg = require("../db.js").pool;
const path = require("path");
const bcrypt = require("bcrypt");
// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// register page
router.route("/register").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../client/views/register.html"));
});

// register a user with psql
router.route("/psql/register").post(async (req, res) => {
  const { display_name, email, password } = req.body;
  let users = await pg.query("select email from users where email=$1", [
    email,
  ]);
  let uFound = users.rows.filter((x) => x.email === email);
  if (uFound.length > 0) {
    console.log("user is found");
    res.send("user is found in db");
  } else {
    let salt = 11;
    let hash = await bcrypt.hash(password, salt);
    let user_inserted = await pg.query(
      "insert into users(display_name,email,password) values($1,$2,$3)",
      [display_name, email, hash]
    );
    res.redirect('/login')
  }
});

module.exports = router;

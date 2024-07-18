const express = require("express");
const router = express.Router();
const mysql = require("../db.js").mysqlObj;
const { connection, pool } = require("../db.js").mysqlObj;
const pg = require("../db.js").pool;

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("client/test"));

// create a user with mysql
router.route("/mysql/spawn").post(async (req, res) => {
  const { display_name, email, gender } = req.body;
  // are users existent in the db?
  await fetch("http://localhost:9934/read/mysql/review/users")
    .then((r) => r.json())
    .then((d) => {
      if (!d.users) res.json({ err: "no data present" });
      let userFound = [...d.users].filter((user, index) => {
        return user.email === email;
      });
      if (userFound.length > 0) {
        console.log("user is found");
        res.send("user is found in db");
      } else {
        connection.query(
          "insert into users(display_name,email,gender) values(?,?,?)",
          [display_name, email, gender],
          (err, result) => {
            return err ? console.log(err) : res.send("user created!");
          }
        );
      }
    });
});
// create a user with psql
router.route("/psql/spawn").post(async (req, res) => {
  const { user_id, display_name, email, gender } = req.body;
  await fetch("http://localhost:9934/read/psql/review/users")
    .then((r) => r.json())
    .then(async (d) => {
      if (!d.users) res.json({ err: "no data present" });
      let userFound = [...d.users].filter((user, index) => {
        return user.email === email;
      });
      if (userFound.length > 0) {
        console.log("user is found");
        res.send("user is found in db");
      } else {
        let user_inserted = await pg.query(
          "insert into users(display_name,email,gender) values($1,$2,$3)",
          [display_name, email, gender]
        );
        console.log(user_inserted);
        res.send('user added')
        
      }
    });
});

module.exports = router;

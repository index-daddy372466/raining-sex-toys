const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const pg = require("../db/db.js").pool;

const createToken = async (email) => {
  let res;
  try {
    // get user by email
    let user = await pg.query("select * from users where email = $1", [email]);
    // sign token
    if (user.rows.length<1) res = false;
    let found = user.rows[0];
    console.log(found)
    let payload = { token: found.email };
    let token = jwt.sign(payload, "secret key");
    return token
  } catch (err) {
    if (err) throw err;
    console.log(err);
  }
};

router.route("/login").post(
  // passport.authenticate("local", {
  //   successRedirect: "/game",
  //   failureRedirect: "/login",
  // }),
  async(req, res) => {
    const { email, password } = req.body;
    let token = await createToken(email);
    console.log("token here");
    console.log(token);
    res.redirect("/login");
  }
);
// home or game if authenticated
router.get("/", (req, res) => {
  res.redirect("/home");
});
// home
router.route("/home").get((req, res) => {
  if (req.isAuthenticated()) console.log("yes queen");
  res.render("home.ejs", {
    isAuthenticated: req.isAuthenticated(),
  });
});
// register
router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
// login
router.route("/login").get(checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("you are not authenticated!!!");
    next();
  } else {
    console.log("you are authenticated");
    res.redirect("/game");
  }
}

module.exports = router;

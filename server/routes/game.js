const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
let svg = [];
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('../passport.config')

initializePassport(passport)
router.use(express.json());
router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize())
router.use(passport.session())
router.use(express.static('client/game'))
// home or game if authenticated
// router.get('/',(req,res)=>{
//   res.sendFile(path.resolve(__dirname, '../../client/game/index.html'))
// })
// get svgs/icons
router.route("/svgs").get((req, res) => {
  // get absolute path from icons dir
  readdirSync(path.resolve(__dirname, "..", "icons")).forEach((file) => {
    // read files (.svg)
    let f = readFileSync(
      path.resolve(__dirname, "..", `icons/${file}`),
      "utf8",
      (err, fi) => {
        return err ? console.log(err) : fi;
      }
    );
    svg.push(f);
  });
  // return array of svgs
  res.json({ list: svg });
});

// get wave
router.route("/level/:wave").post((req, res) => {
  const { wave } = req.body;
  if (typeof wave == "number") {
    res.json({ wave: wave });
  } else {
    res.json({ api: "type not found" });
  }
});

module.exports = router;

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     console.log("you are authenticated");
//     next();
//   }
//   console.log("you are not authenticated!!!");
//   res.redirect("/home");
// }
const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const { checkAuthenticated } = require('../lib/auth.config.js')
const { getHighestLevel } = require('../db/commands.js')
const path = require("path");
const svg = [];



router.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy","img-src 'self' blob: data:");
  return next();
});
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").get(async(req, res) => {
  let db_prop;
  if(req.isAuthenticated()){
    req.session.identity = req.user.user_id;
    db_prop = await new getHighestLevel('psql',req.session.identity).executeQuery()
  }
  else{
    db_prop = 1;
  }

  // console.log(req.session);
  res.render("index", {
    isAuthenticated: req.isAuthenticated(),
    levels: ([...new Array(db_prop).fill('')].map((_,idx)=>idx+1)).map(Number)
  });
});
router.route("/token").get((req, res) => {
  if (req.isAuthenticated()) {
    res.json({ token: req.session });
  } else {
    res.json({ token: "no token (not authenticated)" });
  }
});

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
    req.session.wave = wave;
    res.json({ wave: wave });
  } else {
    res.json({ api: "type not found" });
  }
});

module.exports = router;

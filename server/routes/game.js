const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
const svg = [];

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.route("/token").get((req, res) => {
  if (req.isAuthenticated()) {
    res.json({ token: req.session });
  } else {
    res.json({ token: "no token (not authenticated)" });
  }
});
router.route("/").get((req, res) => {
  if (req.isAuthenticated()) {
    req.session.identity = req.user.user_id;
  }
  console.log(req.session);
  res.render("index", {
    isAuthenticated: req.isAuthenticated(),
  });
});
router.use((req, res, next) => {
  console.log(req.isAuthenticated());
  next();
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
    res.json({ wave: wave });
  } else {
    res.json({ api: "type not found" });
  }
});

module.exports = router;

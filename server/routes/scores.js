const express = require("express");
const router = express.Router();
const { GetScores } = require("../db/commands.js");
const {checkAuthenticated} = require("../lib/auth.config.js")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").get(checkAuthenticated,(req, res) => {
  // render frontend ejs
  res.render("scores.ejs");
});

router.route("/all").get(checkAuthenticated,async (req, res) => {
  try {
    const getScores = new GetScores("psql");
    const found = await getScores.executeQuery();
    return !found
      ? res.json({ err: "no scores found" })
      : res.json({ data: found });
  } catch (err) {
    throw err;
  }
});


module.exports = router;

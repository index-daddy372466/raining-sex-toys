const express = require("express");
const router = express.Router();
const { UpdateScoreByUserId } = require("../commands.js");
const { urlencoded } = require("body-parser");
const pg = require("../db.js").pool;
const { checkAuthenticated } = require("../../lib/auth.config.js");
router.use(express.json());
router.use(express.json(urlencoded({ extended: true })));

router.route("/").get((req, res) => {
  res.json({ data: "update" });
});

// verify password
router.route("/auth/verify").post(checkAuthenticated,(req, res) => {
  const { password } = req.body;
  console.log(password)
  let verifyMe = /(kyle|fuck|123)/.test(password);
  if (verifyMe && !/(function|number|object|array)/.test(typeof(verifyMe))) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

router.route("/score/:id").post(async (req, res) => {
  let { score, best } = req.body;
  const { id } = req.params;
  try {
    let getScores = new UpdateScoreByUserId("psql", best, score, id);
    let updated = await getScores.executeQuery();
    return !updated
      ? res.json({ data: "scores not updated" })
      : res.json({ score: updated });
  } catch (err) {
    throw err;
  }
});

module.exports = router;

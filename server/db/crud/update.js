const express = require("express");
const router = express.Router();
const { UpdateScoreByUserId } = require("../commands.js");
const { urlencoded } = require("body-parser");
const pg = require("../db.js").pool;

router.use(express.json());
router.use(express.json(urlencoded({ extended: true })));

router.route("/").get((req, res) => {
  res.json({ data: "update" });
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

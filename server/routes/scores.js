const express = require("express");
const router = express.Router();
const {
  GetScores,
  GetScoresByUserId,
  GetScoresSpectrum,
  GetBestScore,
  GetWorstScore,
} = require("../db/commands.js");
const { checkAuthenticated } = require("../lib/auth.config.js");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// router.use(checkAuthenticated)

router.route("/").get( (req, res) => {
  // render frontend ejs
  res.render("scores.ejs",{
    isAuthenticated:req.isAuthenticated(),
  });});

router.route("/all").get( async (req, res) => {
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
router.route("/users/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const getScores = new GetScoresByUserId("psql", id);
    const found = await getScores.executeQuery();
    return !found
      ? res.json({ err: "no scores found" })
      : res.json({ data: found });
  } catch (err) {
    throw err;
  }
});
router
  .route("/spectrum/:id/query")
  .get( async (req, res) => {
    const { id } = req.params;
    const { from, to } = req.query;
    try {
      if (!id || id == "") res.json({ err: "id not specified" });
      const getScores = new GetScoresSpectrum("psql", id, from, to);
      const found = await getScores.executeQuery();
      return !found
        ? res.json({ err: "no scores found" })
        : res.json({ data: found });
    } catch (err) {
      throw err;
    }
  });
router
  .route("/spectrum/:id/:condition")
  .get( async (req, res) => {
    const { id, condition } = req.params;
    try {
      if(/best/i.test(condition)){
      const getScores = new GetBestScore("psql", id);
      const found = await getScores.executeQuery();
      return !found
        ? res.json({ err: "no scores found" })
        : res.json({ data: found });
      }
      else if(/worst/i.test(condition)){
      const getScores = new GetWorstScore("psql", id);
      const found = await getScores.executeQuery();
      return !found
        ? res.json({ err: "no scores found" })
        : res.json({ data: found });
      }
      else{
        res.status(403).send('Non-secure Endpoint')
      }
      
    } catch (err) {
      throw err;
    }
  });

module.exports = router;

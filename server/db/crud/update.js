const express = require("express");
const router = express.Router();
const QueryCommand = require("../commands.js");
const { urlencoded } = require("body-parser");
const pg = require("../db.js").pool;

router.use(express.json());
router.use(express.json(urlencoded({ extended: true })));
router.route("/").get((req, res) => {
  res.json({ data: "update" });
});

router.route("/score/best/:id").post((req, res) => {
  console.log("score post route");
  let { score } = req.body;
  const { id } = req.params;
  console.log(score);
  console.log(id);
  // let updateScore = new QueryCommand("psql", id ,score);
  // let updated = updateScore.postScore();
  try {
    let updateScore = pg.query(
      `insert into scores(best,average,u_id) values($1,0,$2)`,
      [score, id]
    );
    if(!updateScore) res.json({err:'error on insert'})
    res.json({score:score})
  } catch (err) {
    if (err) console.log(err);
  }
});

module.exports = router;

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

router.route("/score/:id").post(async (req, res) => {
  let { score, best } = req.body;
  const { id } = req.params;
  console.log("just a reg score: ");
  console.log(score);
  console.log(id);

  try {
    let average = await pg.query(
      "select (cast(sum(score) + $1 as integer) / (count(score)+1)) as avg from scores",
      [score]
    );
    console.log(average);
    let avg = average.rows[0].avg == null ? score : +average.rows[0].avg;
    let updateScore = await pg.query(
      `insert into scores(best,average,u_id,score) values($1,$2,$3,$4)`,
      [best, avg, id, score]
    );

    if (!updateScore) res.json({ err: "error on insert" });
    res.json({ score: score });
  } catch (err) {
    if (err) console.log(err);
  }
});
router.route("/score/best/:id").post(async (req, res) => {
  let { score, best } = req.body;
  const { id } = req.params;
  try {
    let average = await pg.query(
      "select (cast(sum(score) + $1 as integer) / (count(score)+1)) as avg from scores",
      [score]
    );
    console.log(average);
    let avg = average.rows[0].avg == null ? score : +average.rows[0].avg;
    let updateScore = await pg.query(
      `insert into scores(best,average,u_id,score) values($1,$2,$3,$4)`,
      [best, avg, id, score]
    );

    if (!updateScore) res.json({ err: "error on insert" });
    res.json({ score: score });
  } catch (err) {
    if (err) console.log(err);
  }
});

module.exports = router;

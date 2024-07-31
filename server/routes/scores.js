const express = require("express");
const router = express.Router();
const {GetScores} = require('../db/commands.js')
router.use(express.json());

router.route("/").get((req, res) => {
//   res.send("welcome to scores");
res.render('scores.ejs')
});





module.exports = router;

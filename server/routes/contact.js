const express = require("express");
const router = express.Router();

router.use(express.json());

router.route("/").get((req, res) => {
  res.send("welcome to contact");
});

module.exports = router;

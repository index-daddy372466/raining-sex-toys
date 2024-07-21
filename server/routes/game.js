const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
let svg = [];

router.use(express.json());
router.use(express.static("client/game"));


// router.route('/').get((req,res)=>{
//   console.log('game is fired!')
//     res.sendFile(path.resolve(__dirname,'../../client/game/index.html'))
// })
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

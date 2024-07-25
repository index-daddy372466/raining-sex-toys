const express = require('express')
const router = express.Router();
const QueryCommand = require('../commands.js');
const { urlencoded } = require('body-parser');


router.use(express.json())
router.use(express.json(urlencoded({extended:true})))
router.route('/').get((req,res)=>{
    res.json({data:'update'})
})

router.route("/score").post((req, res) => {
    const { score } = req.body;
    console.log(score)
    res.json({score:score})
  });




module.exports = router;
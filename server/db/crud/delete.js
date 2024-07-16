const express = require('express')
const router = express.Router();



router.route('/').get((req,res)=>{
    res.json({data:'delete'})
})




module.exports = router;
const express = require('express')
const router = express.Router();



router.route('/').get((req,res)=>{
    res.json({data:'create'})
})




module.exports = router;
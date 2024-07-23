const express = require('express')
const router = express.Router();



router.route('/').get((req,res)=>{
    res.json({data:'delete'})
})
router.route('/logout').delete((req,res)=>{
    req.logOut();
    res.redirect('/')
})





module.exports = router;
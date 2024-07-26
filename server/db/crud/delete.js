const express = require('express')
const router = express.Router();
const override = require('method-override')

router.use(override('_method'))

router.route('/').get((req,res)=>{
    res.json({data:'delete'})
})
router.route('/logout').delete((req,res)=>{
    req.session.destroy(err=>{
        return err ? console.log(err) : console.log('user signed out')
    });
    res.redirect('/')
})


module.exports = router;
const express = require('express')
const router = express.Router();
const override = require('method-override')
const pg = require('../db.js').pool
const { checkAuthenticated } = require('../../lib/auth.config.js')

router.use(override('_method'))

router.route('/').get((req,res)=>{
    res.json({data:'delete'})
})
router.route('/cereal/data').get((req,res)=>{
    try{
        pg.query('truncate users,scores cascade; alter sequence users_user_id_seq restart with 1;alter sequence scores_score_id_seq restart with 1;')
        req.session.destroy(err=>{
            return err ? console.log(err) : console.log('user signed out')
        });
        res.redirect('/')
    }
    catch(err){
        throw err
    }
})
router.route('/logout').delete((req,res)=>{
    req.session.destroy(err=>{
        return err ? console.log(err) : console.log('user signed out')
    });
    res.redirect('/')
})
router.route('/logout').get(checkAuthenticated,(req,res)=>{
    req.session.destroy(err=>{
        return err ? console.log(err) : console.log('user signed out')
    });
    res.redirect('/')
})



module.exports = router;
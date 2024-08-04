const express = require("express");
const router = express.Router();
// const {checkAuthenticated} = require('../lib/auth.config')

router.use(express.json());
const dummy = {display_name:'kyle',email:'kyle@kyle'}
router.route("/").get((req, res) => {
//   const { display_name, email } = dummy
  const { display_name, email } = req.session.passport.user;


  // res.render('settings.ejs',{
  // user:username.toUpperCase(),
  // isAuthenticated:req.isAuthenticated(),
  // })
  res.render("settings.ejs", {
    isAuthenticated: req.isAuthenticated(),
    test: [display_name, email,'Current','New','Confirm'],
  });
});

module.exports = router;

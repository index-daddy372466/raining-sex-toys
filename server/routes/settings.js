const express = require("express");
const router = express.Router();
const {checkAuthenticated} = require('../lib/auth.config')

router.use(express.json());

router.route("/").get((req, res) => {
//   res.send("welcome to settings");
// console.log(req.session)
console.log(req.session.passport.user.display_name)
let username = req.session.passport.user.display_name;
res.render('settings.ejs',{
user:username.toUpperCase(),
isAuthenticated:req.isAuthenticated(),
})
});

module.exports = router;

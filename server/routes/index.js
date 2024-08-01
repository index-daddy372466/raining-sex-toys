





const express = require("express");
const router = express.Router();
const passport = require('passport')
const cookieParser  = require('cookie-parser')
const { checkNotAuthenticated } = require('../lib/auth.config');

router.use(cookieParser())
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.route("/login").post(
    passport.authenticate("local", {
      successRedirect: "/game",
      failureRedirect: "/login",
    })
  );
  // home or game if authenticated
  router.get('/',(req,res)=>{
    res.redirect('/home')
  })
  // home
  router.route("/home").get( (req, res) => {
    res.render("home.ejs",{
      isAuthenticated:req.isAuthenticated(),
    });
  });
  // register
  router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
  });
  // login
  router.route("/login").get(checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
  });
  
  module.exports = router;

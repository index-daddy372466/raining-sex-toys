





const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
const svg = [];
const passport = require('passport')
const cookieParser  = require('cookie-parser')
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
    if(req.isAuthenticated())console.log('yes queen')
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
  
  
  function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      console.log("you are not authenticated!!!");
      next();
    } else {
      console.log("you are authenticated");
      res.redirect("/game");
    }
  }

  module.exports = router;

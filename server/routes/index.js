





const express = require("express");
const router = express.Router();
const { readdirSync, readFileSync } = require("fs");
const path = require("path");
const svg = [];
const passport = require('passport')

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

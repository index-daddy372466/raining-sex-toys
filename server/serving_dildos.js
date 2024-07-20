require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const helmet = require("helmet");
const PORT = !process.env.PORT ? 9934 : process.env.PORT;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const routingMiddleware = require("./routingMiddleware.js");
const initializePassport = require("./passport.config.js");
initializePassport(passport);

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/public"));
routingMiddleware(app);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(helmet());

app.get('/wtf',(req,res)=>{
  console.log(req.user)
  res.send('test')
})
app.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// home
app.route("/").get(checkAuthenticated,(req,res)=>{
  console.log('you are authenticated and home base')
})
// register
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/views/register.html"));
});
// login
app.route("/login").get(checkNotAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/views/login.html"));
});
// listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("you are not authenticated!!!");
    next();
  } else {
    console.log("you are authenticated");
    console.log(req)
    res.redirect("/");
  }
}
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req)
    console.log("you are authenticated");
    next();
  }
  console.log("you are not authenticated!!!");
  res.redirect("/login");
}

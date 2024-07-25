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
const MemoryStore = require('memorystore')(session)
initializePassport(passport);
app.use(express.static('client/public'))
app.set('views', path.resolve(__dirname,'../client/views'));
// app.use(express.static('client/public'))
app.set('view engine','ejs')
// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: {maxAge: 21600000},
    store:new session.MemoryStore({
      checkPeriod:21600000
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(helmet());
routingMiddleware(app);


// app.route("/login").post(
//   passport.authenticate("local", {
//     successRedirect: "/game",
//     failureRedirect: "/login",
//   })
// );

// // home or game if authenticated
// app.get('/',(req,res)=>{
//   res.redirect('/home')
// })
// // home
// app.route("/home").get( (req, res) => {
//   res.render("home.ejs",{
//     isAuthenticated:req.isAuthenticated(),
//   });
// });
// // register
// app.get("/register", checkNotAuthenticated, (req, res) => {
//   res.render('register.ejs');
// });
// // login
// app.route("/login").get(checkNotAuthenticated, (req, res) => {
//   res.render("login.ejs");
// });

// listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

// function checkNotAuthenticated(req, res, next) {
//   if (!req.isAuthenticated()) {
//     console.log("you are not authenticated!!!");
//     next();
//   } else {
//     console.log("you are authenticated");
//     res.redirect("/game");
//   }
// }


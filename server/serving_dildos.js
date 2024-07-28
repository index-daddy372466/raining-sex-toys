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
const nocache = require("nocache");
//var cookieSession = require('cookie-session');



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
    cookie: {maxAge: 21600000, secure:false},
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
// cookie session

// app.use(cookieSession({
//     keys: ['secret']
// }));

// app.use(helmet());
routingMiddleware(app);
app.use(nocache())


// listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});


require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const PORT = !process.env.PORT ? 9934 : process.env.PORT;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const routingMiddleware = require("./lib/routingMiddleware.js");
const initializePassport = require("./lib/passport.config.js");
const MemoryStore = require("memorystore")(session);
  
initializePassport(passport);

app.use(express.static("client/public"));
app.set("views", path.resolve(__dirname, "../client/views/main"));
// app.use(express.static('client/public'))
app.set("view engine", "ejs");
// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: { maxAge: 21600000, secure: false, httpOnly: false },
    store: new MemoryStore({
      checkPeriod: 21600000,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
routingMiddleware(app);

// listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

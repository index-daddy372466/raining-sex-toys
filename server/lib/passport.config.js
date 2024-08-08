const bcrypt = require("bcrypt");
const pg = require("../db/db.js").pool;
// const { mysqlObj, pool } = require("./db/db.js");
const LocalStrategy = require("passport-local").Strategy;
const { GetUserByEmail, GetUserById } = require('../db/commands.js')

function initialize(passport) {
  // get user by email address
  const authenticateUser = async (email, password, done) => {
    const findUser = new GetUserByEmail('psql',email)
    const userFound = await findUser.executeQuery();
    console.log(userFound)
    let user = userFound
    if (user == null) {
      return done(null, false, { message: "No user found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "wrong password" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password", session: true },
      authenticateUser
    )
  );

  // serial/deserial
  passport.serializeUser(function (user, done) {  
    return done(null, user);
  });
  passport.deserializeUser(async function (user, done) {
    const findId = new GetUserById('psql',user.user_id)
    const idFound = await findId.executeQuery();
    const id = idFound[0]
    return done(null, id);
  });
}
module.exports = initialize;

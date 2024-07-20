const bcrypt = require("bcrypt");
const pg = require("./db/db.js").pool;
// const { mysqlObj, pool } = require("./db/db.js");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
  // get user by email address
  const getUserByEmail = async (email) => {
    return await fetch("http://localhost:9934/read/psql/review/users")
      .then((r) => r.json())
      .then(async (d) => {
        if (!d.users) console.log("no data present");
        if (!d.users) JSON.parse(JSON.stringify({ err: "no data present" }));
        return [...d.users].find((user, index) => {
          return user.email === email;
        });
      });
  };
  // get user by id
  const getUserById = async(id) => {
    await fetch("http://localhost:9934/read/psql/review/users")
      .then((r) => r.json())
      .then((d) => {
        if (!d.users) console.log("no-data present");
        return [...d.users].find((user, index) => {
          return user.user_id == id;
        });
      });
  };
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
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
  passport.deserializeUser(function (id, done) {
    return done(null, getUserById(id));
  });
}
module.exports = initialize;

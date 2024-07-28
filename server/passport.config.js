const bcrypt = require("bcrypt");
const pg = require("./db/db.js").pool;
// const { mysqlObj, pool } = require("./db/db.js");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
  // get user by email address
  const getUserByEmail = async (email) => {
    try{
      let getUsers = await pg.query('select * from users where email=$1',[email])
      if(getUsers.rows.length<1){
        console.log('no user found')
      }
      else{
        return getUsers.rows[0]
      }
    }
    catch(err){
      console.log(err)
    }
  };
  // get user by id
  const getUserById = async(id) => {
    try{
      console.log(id)
      let getUsers = await pg.query('select * from users where user_id=$1',[id])
      if(getUsers.rows.length<1){
        console.log('no user found')
      }
      else{
        return getUsers.rows[0]
      }
    }
    catch(err){
      console.log(err)
    }
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
  passport.deserializeUser(async function (user, done) {
    return done(null, await getUserById(user.user_id));
  });
}
module.exports = initialize;

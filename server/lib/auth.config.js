
const bcrypt = require('bcrypt')
function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("you are not authenticated!!!");
    next();
  } else {
    console.log("you are authenticated");
    res.redirect("/game");
  }
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // not auth
    console.log("authenticated");
    next();
  } else {
    console.log("not authenticated");
    res.redirect("/");
  }
}

async function updateAuth(req,res,next){
  let hash = req.session.passport.user.password
  let { password } = req.body;
  
    if(await bcrypt.compare(password,hash)){    
      next();
    }
    else{
      console.log('wrong password')
      res.status(401).json({err:'wrong'})
    }  

}

module.exports = { checkNotAuthenticated, checkAuthenticated, updateAuth };

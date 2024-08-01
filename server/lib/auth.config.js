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

module.exports = { checkNotAuthenticated, checkAuthenticated };

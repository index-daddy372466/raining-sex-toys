const express = require("express");
const router = express.Router();

router.use(express.json());
router.route("/").get((req, res) => {
  const { display_name, email } = req.session.passport.user;

  res.render("settings.ejs", {
    isAuthenticated: req.isAuthenticated(),
    test: [display_name, email,'New','Confirm'],
  });
});

module.exports = router;

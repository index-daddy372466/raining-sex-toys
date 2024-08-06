const express = require("express");
const router = express.Router();
const { UpdateAccount, UpdateScoreByUserId } = require("../commands.js");
const { urlencoded } = require("body-parser");
const pg = require("../db.js").pool;
const { checkAuthenticated, updateAuth } = require("../../lib/auth.config.js");
router.use(express.json());
router.use(express.json(urlencoded({ extended: true })));


router.route("/").get((req, res) => {
  res.json({ data: "update" });
});

// verify password
router.route("/auth/verify").post(checkAuthenticated, updateAuth, async (req, res) => {
    const aside = req.session.aside;
    try{
    // update account data
    const updateAccount = new UpdateAccount('psql',+req.session.passport.user.user_id,aside)
    await updateAccount.executeQuery()
    if(aside.password){
    req.session.destroy((err)=>{
    return err ? console.log(err) : console.log('user signed out')
    });
    }
    else{
      res.json({verified:true})
  }
    }
    catch(err){
      console.log(err)
    }
    
  });

router.route("/score/:id").post(async (req, res) => {
  let { score, best } = req.body;
  const { id } = req.params;
  try {
    let getScores = new UpdateScoreByUserId("psql", best, score, id);
    let updated = await getScores.executeQuery();
    return !updated
      ? res.json({ data: "scores not updated" })
      : res.json({ score: updated });
  } catch (err) {
    throw err;
  }
});

module.exports = router;

const passport = require("passport");
const express = require("express");
const router = express.Router();

//start oauth process
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
//after user give permission then redirect to this uri and give back information you need
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.send("hello user");
  }
);

router.get("/api/logout", (req, res) => {
  req.logout(); //attached by passport library
  res.send(req.user); //destroied by passport so it's empty
});

router.get("/api/current_user", (req, res) => {
  //   res.send(req.user);
  res.send(req.session);
});

module.exports = router;

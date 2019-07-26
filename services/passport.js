const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/key");
const User = require("mongoose").model("users");

//serialize whatever info you passed into
//after you have been authenticated by oauth20, here we pass user id
//we set user.id as cookie value
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//request from browser will go to this before any route
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// console.developers.google.com
passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({ googleId: profile.id });
        await user.save();
        //above 2 line are equivalent of new User({ googleId: profile.id }).save().then((user)=>done(null,user));
      }
      done(null, user); //serialize before send info back to clientside
    }
  )
);

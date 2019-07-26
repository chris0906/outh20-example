const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key");
require("./models/user"); //just make this file to be executed
require("./services/passport"); //just make this file to be executed
const authRoute = require("./routes/authRoutes");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("connect to mongoDB"))
  .catch(err => console.log(err));

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //millisecond sytle:30 days
    keys: [keys.cookieKey] //we can give multiple key and randomly choose one to encrypt cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listen to port ${port}`));

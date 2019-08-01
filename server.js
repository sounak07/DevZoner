const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbconnect");
const passport = require("passport");

const app = express();

//routes
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const posts = require("./api/routes/posts");
const index = require("./api/routes/index");

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
};

app.use(logRequestStart);

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect database
connectDB();

//passport-Setup
app.use(passport.initialize());
// app.use((req, res, next) => {
//   //CORS

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS,DELETE");
//   res.header(
//     "Access-Control-Expose-Headers",
//     "X-Api-Version, X-Request-Id, X-Response-Time"
//   );
//   next();
// });

require("./config/passport")(passport);

app.use("/api", index);
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

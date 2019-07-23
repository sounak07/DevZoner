const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbconnect");

const app = express();

//routes
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const posts = require("./api/routes/posts");
const index = require("./api/routes/index");
const auth = require("./api/routes/auth");

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect database
connectDB();

app.use("/api", index);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

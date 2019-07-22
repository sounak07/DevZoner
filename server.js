const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Api running successfully" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running");
});

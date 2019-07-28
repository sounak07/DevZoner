const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const validationPostInput = require("../../validation/postValidation");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Post Router"
  });
});

router.post(
  "/addPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationPostInput(req.body);

    // const errors = {};

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const postData = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    postData
      .save()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(e => {
        errors.nopost = "Could not save";
        res.status(400).json();
      });
  }
);

module.exports = router;

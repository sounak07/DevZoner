const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const validationPostInput = require("../../validation/postValidation");

//GET ALL POSTS
//PUBLIC ROUTE
router.get("/all", (req, res) => {
  let errors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(e => {
      errors.noposts = "No posts found";
      res.status(404).json();
    });
});

//GET POSTS BY ID
//PUBLIC ROUTE
router.get("/post/:post_id", (req, res) => {
  let errors = {};
  Post.findById(req.params.post_id)
    .then(post => {
      if (!post) {
        errors.nopost = "No post found with that id";
        res.status(404).json(errors);
      } else {
        res.status(200).json(post);
      }
    })
    .catch(e => {
      errors.nopost = "Not found";
      res.status(404).json();
    });
});

//POST POSTS
//PRIVATE ROUTE
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

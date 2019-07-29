const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Post");
const validationPostInput = require("../../validation/postValidation");
const validationCommentInput = require("../../validation/commentValidation");

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
router.get("/:post_id", (req, res) => {
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

//DELETE ROUTE FOR POSTS
//PRIVATE ROUTE
router.delete(
  "/removePost/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Post.findById(req.params.post_id).then(post => {
            if (post.user.toString() !== req.user.id) {
              errors.notAuth = "Not Authorised";
              return res.status(402).json(errors);
            }

            post.remove().then(post => {
              res.status(200).json({
                success: true
              });
            });
          });
        }
      })
      .catch(e => {
        errors.noprofile = "No profile found";
        res.status(404).json(errors);
      });
  }
);

//ADD LIKES ROUTE
//PRIVATE ROUTE
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Then :No profile found";
          res.status(404).json(errors);
        } else {
          Post.findById(req.params.post_id).then(post => {
            if (post) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                  .length > 0
              ) {
                errors.isLike = "User liked already";
                return res.status(400).json(errors);
              }

              post.likes.unshift({ user: req.user.id });
              post.save().then(post => {
                res.status(200).json(post);
              });
            } else {
              errors.nopost = "No post found";
              res.status(404).json(errors);
            }
          });
        }
      })
      .catch(e => {
        errors.noprofile = "No profile found";
        res.status(404).json(errors);
      });
  }
);

//REMOVE LIKES ROUTE
//PRIVATE ROUTE
router.delete(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile found";
          res.status(404).json(errors);
        } else {
          Post.findById(req.params.post_id).then(post => {
            if (post) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                  .length === 0
              ) {
                errors.notLiked = "Post not liked by user";
                return res.status(400).json(errors);
              }

              const removelikeIndex = post.likes
                .map(like => like.user)
                .indexOf(req.user.id);

              post.likes.splice(removelikeIndex, 1);
              post.save().then(post => {
                res.status(200).json(post);
              });
            } else {
              errors.nopost = "No post found";
              res.status(404).json(errors);
            }
          });
        }
      })
      .catch(e => {
        errors.noprofile = "No profile found";
        res.status(404).json(errors);
      });
  }
);

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

//ADD COMMENTS ROUTE
//PRIVATE ROUTE
router.post(
  "/addComment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationCommentInput(req.body);

    // const errors = {};

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile found";
          res.status(404).json(errors);
        } else {
          Post.findById(req.params.id).then(post => {
            if (!post) {
              errors.noprofile = "No post found";
              res.status(404).json(errors);
            } else {
              const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar
              };

              post.comments.unshift(newComment);
              post.save().then(post => res.status(200).json(post));
            }
          });
        }
      })
      .catch(e => {
        errors.nopost = "Could not save";
        res.status(400).json();
      });
  }
);

module.exports = router;

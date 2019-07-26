const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//validation
const validationProfileInput = require("../../validation/profile");

//get profile route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for the user";
          res.status(404).json(errors);
        }

        res.status(200).json(profile);
      })
      .catch(e => {
        res.status(404).json(e);
      });
  }
);

//update profile post route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationProfileInput(req.body);

    // const errors = {};

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.handle) profileField.handle = req.body.handle;
    if (req.body.company) profileField.company = req.body.company;
    if (req.body.website) profileField.website = req.body.website;
    if (req.body.location) profileField.location = req.body.location;
    if (req.body.status) profileField.status = req.body.status;

    //skills
    if (typeof req.body.skills !== "undefined")
      profileField.skills = req.body.skills.split(",");

    if (req.body.bio) profileField.bio = req.body.bio;
    if (req.body.githubusername)
      profileField.githubusername = req.body.githubusername;

    profileField.social = {};
    if (req.body.youtube) profileField.social.youtube = req.body.youtube;
    if (req.body.twitter) profileField.social.twitter = req.body.twitter;
    if (req.body.facebook) profileField.social.facebook = req.body.facebook;
    if (req.body.instagram) profileField.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileField.social.linkedin = req.body.linkedin;

    User.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findByIdAndUpdate(
            { id: req.body.id },
            { $set: profileField },
            { new: true }
          )
            .then(profile => {
              res.status(200).json(profile);
            })
            .catch(e => {
              res.status(400).json(e);
            });
        } else {
          Profile.findOne({ handle: req.body.handle }).then(profile => {
            if (profile) {
              errors.handle = "Handle exists try new one!";
              return res.status(409).json(errors);
            }
          });

          new Profile(profileField)
            .save()
            .then(profile => {
              res.status(200).json(profile);
            })
            .catch(e => {
              res.status(400).json(e);
            });
        }
      })
      .catch(e => {
        res.status(404).json(e);
      });
  }
);

module.exports = router;

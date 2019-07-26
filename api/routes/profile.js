const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//validation
const validationProfileInput = require("../../validation/profile");
const validationExperienceInput = require("../../validation/experienceValidation");
const validationEducationInput = require("../../validation/educationValidation");

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

//GET ALL USER PROFILES
//PUBLIC ROUTE
router.get("/all", (req, res) => {
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "No profiles found";
        res.status(404).json(errors);
      }

      res.status(200).json(profiles);
    })
    .catch(e => {
      errors.noprofile = "No profiles found";
      res.status(404).json(errors);
    });
});

//GET USERS BY HANDLE
//PUBLIC ROUTE

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "User doesnot exist";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(e => {
      res.status(404).json({
        error: "Not found"
      });
    });
});

//GET USERS BY USER ID
//PUBLIC ROUTE

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "User doesnot exist";
        return res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(e => {
      res.status(404).json({
        error: "Not found"
      });
    });
});

//update profile or post new profle route
//private route
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

            new Profile(profileField)
              .save()
              .then(profile => {
                res.status(200).json(profile);
              })
              .catch(e => {
                res.status(400).json(e);
              });
          });
        }
      })
      .catch(e => {
        res.status(404).json(e);
      });
  }
);

//POST ROUTE FOR EXPERIENCE
//PRIVATE ROUTE

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationExperienceInput(req.body);

    // const errors = {};

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const experiencedetails = {};
    if (req.body.title) experiencedetails.title = req.body.title;
    if (req.body.company) experiencedetails.company = req.body.company;
    if (req.body.location) experiencedetails.location = req.body.location;
    if (req.body.from) experiencedetails.from = req.body.from;
    if (req.body.to) experiencedetails.to = req.body.to;
    experiencedetails.current = req.body.current;
    if (req.body.description)
      experiencedetails.description = req.body.description;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No found";
          res.status(404).json(errors);
        } else {
          profile.experience.unshift(experiencedetails);

          profile.save().then(profile => {
            res.status(200).json(profile);
          });
        }
      })
      .catch(e => {
        errors.noprofile = "No found";
        res.status(404).json(errors);
      });
  }
);

//POST ROUTE FOR EDUCATION
//PRIVATE ROUTE
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const eductionDetails = {};
    if (req.body.school) eductionDetails.school = req.body.school;
    if (req.body.degree) eductionDetails.degree = req.body.degree;
    if (req.body.fieldofstudy)
      eductionDetails.fieldofstudy = req.body.fieldofstudy;
    eductionDetails.from = req.body.from;
    if (req.body.to) eductionDetails.to = req.body.to;
    if (req.body.current) eductionDetails.current = req.body.current;
    if (req.body.description)
      eductionDetails.description = req.body.description;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No found";
          res.status(404).json(errors);
        } else {
          profile.education.unshift(eductionDetails);

          profile.save().then(profile => {
            res.status(200).json(profile);
          });
        }
      })
      .catch(e => {
        errors.noprofile = "No found";
        res.status(404).json(errors);
      });
  }
);

module.exports = router;

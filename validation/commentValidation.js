const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function commentInputValid(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 5, max: 40 })) {
    errors.comment = "Comment needs to between 5 and 40 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.comment = "Comment cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

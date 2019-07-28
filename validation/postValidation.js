const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function postInputValid(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 40 })) {
    errors.text = "text needs to between 10 and 40 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function experienceValid(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (!validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.name = "Must have atleast 2 characters";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "Title cannot be empty";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company cannot be empty";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Date cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

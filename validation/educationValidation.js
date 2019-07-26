const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function eductionValid(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.title = "School cannot be empty";
  }

  if (validator.isEmpty(data.degree)) {
    errors.company = "Degree cannot be empty";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Date cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

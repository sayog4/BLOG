import Validator from "validator";
import isEmpty from "./isEmpty";

export const validateSignin = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be valid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = "Password must be 6 and 32 characters long";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

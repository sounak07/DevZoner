import * as actionTypes from "../actions/actionTypes";

export const registerUser = userData => {
  return {
    type: actionTypes.AUTH_REGISTER,
    payload: userData
  };
};

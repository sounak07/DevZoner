import isEmpty from "../../validations/isEmpty";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: {}
      };
    case actionTypes.ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;

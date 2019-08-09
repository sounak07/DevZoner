import isEmpty from "../../validations/isEmpty";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  notify: false
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
    case actionTypes.SHOW_NOTIFICATION:
      const current = state.notify;
      return {
        ...state,
        notify: !current
      };
    default:
      return state;
  }
};

export default authReducer;

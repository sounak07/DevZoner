import * as actionTypes from "../actions/actionTypes";

const initialState = {
  errors: {}
};

const errors = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
};

export default errors;

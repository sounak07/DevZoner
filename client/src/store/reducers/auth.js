import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_REGISTER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;

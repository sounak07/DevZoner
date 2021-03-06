import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  errors: {}
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case actionTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
};

export default profile;

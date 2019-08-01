import axios from "axios";

import * as actionTypes from "../actions/actionTypes";

export const getCurrentProfile = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get("/api/profile")
      .then(res => {
        dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(e => {
        dispatch({
          type: actionTypes.GET_PROFILE,
          payload: {}
        });
      });
  };
};

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING
  };
};

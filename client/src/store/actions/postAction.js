import axios from "axios";

import * as actionTypes from "../actions/actionTypes";

export const errorsHandler = errors => {
  return {
    type: actionTypes.ALL_ERRORS,
    payload: errors.response.data
  };
};

export const loading = () => {
  return {
    type: actionTypes.POSTS_LOADING
  };
};

export const getPosts = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get("/api/posts/all")
      .then(res =>
        dispatch({
          type: actionTypes.GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_POSTS,
          payload: {}
        })
      );
  };
};

export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: actionTypes.ADD_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.ALL_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS
  };
};

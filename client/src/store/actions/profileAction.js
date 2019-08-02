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

export const errorsHandle = errors => {
  return {
    type: actionTypes.ALL_ERRORS,
    payload: errors
  };
};

export const postProfile = (data, history) => {
  return dispatch => {
    axios
      .post("/api/profile/", data)
      .then(res => history.push("/dashboard"))
      .catch(e => {
        dispatch(errorsHandle(e.response.data));
      });
  };
};

export const getAllProfiles = () => {
  return dispatch => {
    axios
      .get("/api/profile/all")
      .then(res => {
        dispatch(loading());
        dispatch({
          type: actionTypes.GET_PROFILES,
          payload: res.data
        });
      })
      .catch(e => {
        dispatch(errorsHandle(e));
      });
  };
};

export const addExperience = (expData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/experience", expData)
      .then(res => {
        history.push("/dashboard");
      })
      .catch(e => {
        dispatch({
          type: actionTypes.ALL_ERRORS,
          payload: e.response.data
        });
      });
  };
};

export const addEducation = (eduData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/education", eduData)
      .then(res => {
        history.push("/dashboard");
      })
      .catch(e => {
        dispatch({
          type: actionTypes.ALL_ERRORS,
          payload: e.response.data
        });
      });
  };
};

export const deleteEducation = (id, history) => {
  return dispatch => {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(e => {
        dispatch(errorsHandle(e));
      });
  };
};

export const deleteExperience = (id, history) => {
  return dispatch => {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(e => {
        dispatch(errorsHandle(e));
      });
  };
};

export const deleteAccount = () => {
  return dispatch => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("/api/profile")
        .then(res => {
          dispatch({
            type: actionTypes.SAVE_USER,
            payload: {}
          });
        })
        .catch(e => {
          dispatch(errorsHandle(e.response.data));
        });
    }
  };
};

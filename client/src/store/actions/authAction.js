import axios from "axios";
import jwtDecoded from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import * as actionTypes from "../actions/actionTypes";

export const error = errors => {
  return {
    type: actionTypes.ERROR,
    payload: errors
  };
};

export const saveUser = res => {
  return {
    type: actionTypes.SAVE_USER,
    payload: res
  };
};

export const registerUser = (data, history) => {
  return dispatch => {
    axios
      .post("/api/user/register", data)
      .then(res => {
        // dispatch(saveUser(res.data));
        history.push("/login");
      })
      .catch(e => {
        dispatch(error(e.response.data));
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    axios
      .post("/api/user/login", data)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwtDecoded(token);
        dispatch(saveUser(decoded));
      })
      .catch(e => {
        dispatch(error(e.response.data));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
      setAuthToken(token);
      const decoded = jwtDecoded(token);
      dispatch(saveUser(decoded));
    }
  };
};

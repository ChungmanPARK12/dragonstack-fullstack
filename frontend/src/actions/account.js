// actions/account.js
import { ACCOUNT } from "./types";
import { BACKEND } from "../config";

const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE }) => {
  return function (dispatch) {
    dispatch({ type: ACCOUNT.FETCH });

    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
      .then((response) => response.json())
      .then((json) => {
        if (json.type === "error") {
          dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
        } else {
          dispatch({ type: SUCCESS_TYPE, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: error.message });
      });
  };
};

export function signup({ username, password }) {
  return fetchFromAccount({
    endpoint: "signup",
    options: {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });
}

export function logout() {
  return fetchFromAccount({
    endpoint: "logout",
    options: {
      credentials: "include",
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
  });
}

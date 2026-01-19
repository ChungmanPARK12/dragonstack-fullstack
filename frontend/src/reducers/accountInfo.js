import { ACCOUNT_INFO } from "../actions/types";
import fetchStates from "./fetchStates";

const initialState = {
  status: null,
  message: null
};

const accountInfo = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFO.FETCH:
      return Object.assign({}, state, {
        status: fetchStates.fetching,
        message: null
      });

    case ACCOUNT_INFO.FETCH_ERROR:
      return Object.assign({}, state, {
        status: fetchStates.error,
        message: action.message
      });

    case ACCOUNT_INFO.FETCH_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          status: fetchStates.success,
          message: null
        },
        action.payload.info
      );

    default:
      return state;
  }
};

export default accountInfo;

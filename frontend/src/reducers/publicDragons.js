import { PUBLIC_DRAGONS } from "../actions/types";
import fetchStates from "./fetchStates";

var DEFAULT_PUBLIC_DRAGONS = {
  dragons: [],
  status: fetchStates.success, 
  message: null
};

function publicDragons(state = DEFAULT_PUBLIC_DRAGONS, action) {
  switch (action.type) {
    case PUBLIC_DRAGONS.FETCH:
      return {
        dragons: state.dragons,
        status: fetchStates.fetching,
        message: null
      };

    case PUBLIC_DRAGONS.FETCH_SUCCESS:
      return {
        dragons: action.dragons,
        status: fetchStates.success,
        message: action.message || null
      };

    case PUBLIC_DRAGONS.FETCH_ERROR:
      return {
        dragons: [],
        status: fetchStates.error,
        message: action.message
      };

    default:
      return state;
  }
}

export default publicDragons;

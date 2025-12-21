// reducers/dragon.js
import { DRAGON } from "../actions/types";
import fetchStates from "./fetchStates";

var DEFAULT_DRAGON = {
  generationId: "",
  dragonId: "",
  nickname: "",
  birthdate: "",
  traits: []
};

var INITIAL_STATE = {
  dragon: DEFAULT_DRAGON,
  fetchState: fetchStates.success,
  message: null
};

function dragonReducer(state, action) {
  if (typeof state === "undefined") {
    state = INITIAL_STATE;
  }

  switch (action.type) {
    case DRAGON.FETCH:
      return {
        dragon: state.dragon,
        fetchState: fetchStates.fetching,
        message: null
      };

    case DRAGON.FETCH_SUCCESS:
      return {
        dragon: action.dragon,
        fetchState: fetchStates.success,
        message: null
      };

    case DRAGON.FETCH_ERROR:
      return {
        dragon: state.dragon,
        fetchState: fetchStates.error,
        message: action.message
      };

    default:
      return state;
  }
}

export default dragonReducer;

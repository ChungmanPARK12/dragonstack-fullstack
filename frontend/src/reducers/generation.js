// reducers/generation.js
import { GENERATION } from "../actions/types";
import fetchStates from "./fetchStates";

var DEFAULT_GENERATION = { generationId: "", expiration: "" };

var INITIAL_STATE = {
  generation: DEFAULT_GENERATION,
  fetchState: fetchStates.success, // 또는 null로 시작해도 됨
  message: null,
};

function generationReducer(state, action) {
  if (typeof state === "undefined") {
    state = INITIAL_STATE;
  }

  switch (action.type) {
    case GENERATION.FETCH:
      return {
        generation: state.generation,
        fetchState: fetchStates.fetching,
        message: null,
      };

    case GENERATION.FETCH_SUCCESS:
      return {
        generation: action.generation,
        fetchState: fetchStates.success,
        message: null,
      };

    case GENERATION.FETCH_ERROR:
      return {
        generation: state.generation,
        fetchState: fetchStates.error,
        message: action.message,
      };

    default:
      return state;
  }
}

export default generationReducer;

// reducers/accountDragons.js
import { ACCOUNT_DRAGONS } from "../actions/types";
import fetchStates from "./fetchStates";

var DEFAULT_ACCOUNT_DRAGONS = {
  dragons: [],
  status: fetchStates.success, 
  message: null
};

function accountDragons(state = DEFAULT_ACCOUNT_DRAGONS, action) {
  switch (action.type) {
    case ACCOUNT_DRAGONS.FETCH:
      return {
        dragons: state.dragons,
        status: fetchStates.fetching,
        message: null
      };

    case ACCOUNT_DRAGONS.FETCH_SUCCESS:
      return {
        dragons: action.payload.dragons,      
        status: fetchStates.success,  
        message: action.message || null
      };

    case ACCOUNT_DRAGONS.FETCH_ERROR:
      return {
        dragons: [],                  
        status: fetchStates.error,
        message: action.message
      };

    default:
      return state;
  }
}

export default accountDragons;

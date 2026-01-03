import { ACCOUNT } from "../actions/types";
import fetchStates from "./fetchStates";

var INITIAL_STATE = {
    loggedIn: false,
    status: fetchStates.success, // 또는 null
    message: null
};

function accountReducer(state, action) {
    if (typeof state === "undefined") {
        state = INITIAL_STATE;
    }

    switch (action.type) {
        case ACCOUNT.FETCH:
            return {
                loggedIn: state.loggedIn,
                status: fetchStates.fetching,
                message: null
            };

        case ACCOUNT.FETCH_ERROR:
            return {
                loggedIn: true,
                status: fetchStates.error,
                message: action.message
            };

        case ACCOUNT.FETCH_SUCCESS:
            return {
                loggedIn: true,
                status: fetchStates.success,
                message: action.payload ? action.payload.message : null
            };

        case ACCOUNT.FETCH_LOGOUT_SUCCESS:
            return {
                loggedIn: false,
                status: fetchStates.success,
                message: action.message
            };

        default:
            return state;
    }
}

export default accountReducer;

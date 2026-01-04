import { DRAGON } from "./types";
import { BACKEND } from "../config";

export function fetchDragon() {
    return function (dispatch) {
        dispatch({ type: DRAGON.FETCH });

        return fetch(`${BACKEND.ADDRESS}/dragon/new`)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.type === 'error') {
                    dispatch({
                        type: DRAGON.FETCH_ERROR,
                        message: json.message
                    })
                } else {
                    dispatch({
                        type: DRAGON.FETCH_SUCCESS,
                        dragon: json.dragon
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: DRAGON.FETCH_ERROR,
                    message: error.message
                })
            });
    };
}
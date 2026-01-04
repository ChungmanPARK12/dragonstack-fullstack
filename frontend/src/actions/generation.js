// actions/generation.js
import { GENERATION } from "./types";
import { BACKEND } from "../config";

export function fetchGeneration() {
    return function (dispatch) {
        dispatch({ type: GENERATION.FETCH });

        return fetch(`${BACKEND.ADDRESS}/generation`)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.type === 'error') {
                    dispatch({
                        type: GENERATION.FETCH_ERROR,
                        message: json.message
                    })
                } else {
                    dispatch({
                        type: GENERATION.FETCH_SUCCESS,
                        generation: json.generation
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: GENERATION.FETCH_ERROR,
                    message: error.message
                })
            });
    };
}
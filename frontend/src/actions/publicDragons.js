// actions/publicDragons
import { PUBLIC_DRAGONS } from "./types";
import { BACKEND } from '../config';

export function fetchPublicDragons() {
  return function (dispatch) {
    dispatch({ type: PUBLIC_DRAGONS.FETCH });

    return fetch(`${BACKEND.ADDRESS}/dragon/public-dragons`)
      .then(res => res.json())
      .then(json => {
        if (json.type === 'error') {
          dispatch({ type: PUBLIC_DRAGONS.FETCH_ERROR, message: json.message });
        } else {
          dispatch({ type: PUBLIC_DRAGONS.FETCH_SUCCESS, dragon: json.dragon });

        }
    })
    .catch(error => dispatch({ type: PUBLIC_DRAGONS.FETCH_ERROR, message: error.message }));
  };
}
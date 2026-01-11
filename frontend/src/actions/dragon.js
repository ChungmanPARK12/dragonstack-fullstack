import { DRAGON } from "./types";
import { BACKEND } from "../config";
import { fetchAccountDragons } from "./accountDragons";

export function fetchDragon() {
  return function (dispatch) {
    dispatch({ type: DRAGON.FETCH });

    return fetch(`${BACKEND.ADDRESS}/dragon/new`, { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        if (json.type === 'error') {
          dispatch({ type: DRAGON.FETCH_ERROR, message: json.message });
        } else {
          dispatch({ type: DRAGON.FETCH_SUCCESS, dragon: json.dragon });

          dispatch(fetchAccountDragons());
        }
      })
      .catch(error => {
        dispatch({ type: DRAGON.FETCH_ERROR, message: error.message });
      });
  };
}

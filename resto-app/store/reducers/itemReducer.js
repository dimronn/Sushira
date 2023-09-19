import {
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_REQUEST,
} from "../actions/actionTypes";
const initialState = {
  items: [],
  loading: false,
  error: null,
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case FETCH_ITEMS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default itemReducer;

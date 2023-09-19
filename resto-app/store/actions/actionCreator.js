import {
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,

  // ========CATEGORY==========
  FETCH_CATEGORY_FAILED,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "../actions/actionTypes";

export const itemFetchSuccess = (data) => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: data,
  };
};
export const itemFetchRequest = () => {
  return {
    type: FETCH_ITEMS_REQUEST,
  };
};
export const itemFetchFailed = (data) => {
  return {
    type: FETCH_ITEMS_FAILED,
    payload: data,
  };
};

// ==================================

export const itemFetchAsyncSuccess = (search) => {
  return async (dispatch) => {
    try {
      dispatch(itemFetchRequest());
      const res = await fetch(`https://resto.dimuron.tech/items${search}`);
      const data = await res.json();
      dispatch(itemFetchSuccess(data));
      // console.log(data,"di creator");
    } catch (error) {
      console.log(error);
    }
  };
};

export const itemOneFetchAsyncSuccess = (id) => {
  return async (dispatch) => {
    try {
      dispatch(itemFetchRequest());
      const res = await fetch(`https://resto.dimuron.tech/items/${id}`);
      const data = await res.json();
      return data;
      // console.log(data,"di creator");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// ===============Category==================

export const categoryFetchSuccess = (data) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: data,
  };
};
export const categoryFetchRequest = () => {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
};
export const categoryFetchFailed = (data) => {
  return {
    type: FETCH_CATEGORY_FAILED,
    payload: data,
  };
};

// ==================================
export const categoryFetchAsyncSuccess = () => {
  return async (dispatch) => {
    try {
      dispatch(categoryFetchRequest());
      const res = await fetch("https://resto.dimuron.tech/categories");
      const data = await res.json();
      dispatch(categoryFetchSuccess(data));
      // console.log(data,"di creator");
    } catch (error) {
      console.log(error);
    }
  };
};

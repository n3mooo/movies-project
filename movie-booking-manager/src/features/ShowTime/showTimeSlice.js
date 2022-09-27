import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchMovieAction } from "./action";
const initialState = {
  heThongRap: null,
  maRap: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "films/SET_HE_THONG_RAP":
      return produce(state, (draft) => {
        draft.heThongRap = action.payload;
      });

    case "films/SET_MA_RAP":
      return produce(state, (draft) => {
        draft.maRap = action.payload;
      });
    
      
    default:
      return state;
  }
};
export default reducer;

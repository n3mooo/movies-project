import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchMovieAction } from "./action";
const initialState = {
  movies: null,
  selectedMovie: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "films/SET_MOVIES":
      return produce(state, (draft) => {
        draft.movies = action.payload;
      });

    case "films/GET_MOVIES_DETAIL":
      return produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
    
      // case "films/RESET_SELECTED":
      // return produce(state, (draft) => {
      //   draft.selectedMovie = [];
      // });
    default:
      return state;
  }
};
// export default moviesSlice;
export default reducer;

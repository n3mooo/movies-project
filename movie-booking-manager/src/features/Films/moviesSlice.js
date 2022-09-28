import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchMovieAction, GET_MOVIE_DETAIL, RESET_SELECTED, SET_MOVIES } from "./action";
const initialState = {
  movies: null,
  selectedMovie: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return produce(state, (draft) => {
        draft.movies = action.payload;
      });

    case GET_MOVIE_DETAIL:
      return produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
    
      // case RESET_SELECTED:
      // return produce(state, (draft) => {
      //   draft.selectedMovie = null;
      // });
    default:
      return state;
  }
};
// export default moviesSlice;
export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieScheduleAction } from "./action";

const initialState = {
    theater: null,
};

const theaterSlice = createSlice({
    name: "theater",
    initialState: initialState,
    extraReducers: {
        [fetchMovieScheduleAction.fulfilled]: (state, action) => {
            state.theater = action.payload;
        },
    },
});

export default theaterSlice;

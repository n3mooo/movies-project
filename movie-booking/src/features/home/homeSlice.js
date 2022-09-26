import {
    fetchBannersAction,
    fetchBoxOfficeAction,
    fetchCinemasAction,
    fetchMovieDetailAction,
    fetchMoviesAction,
} from "./action";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banners: null,
    movies: null,
    selectedMovie: null,
    cinemas: null,
    boxOffice: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        updateTicket(state, action) {
            const cloneTicketMovie = [...state.ticketMovie];
            const foundTicket = cloneTicketMovie.findIndex(
                (item) => item.maGhe === action.payload.maGhe
            );

            if (foundTicket !== -1) {
                cloneTicketMovie.splice(foundTicket, 1);
            } else {
                cloneTicketMovie.push(action.payload);
            }
            state.ticketMovie = cloneTicketMovie;
        },

        clearTicket(state, action) {
            state.ticketMovie = action.payload;
        },
        setStatus(state, action) {
            state.status = false;
        },
    },
    extraReducers: {
        [fetchBannersAction.fulfilled]: (state, action) => {
            state.banners = action.payload;
        },

        [fetchMoviesAction.fulfilled]: (state, action) => {
            state.movies = action.payload;
        },

        [fetchMovieDetailAction.fulfilled]: (state, action) => {
            state.selectedMovie = action.payload;
        },

        [fetchCinemasAction.fulfilled]: (state, action) => {
            state.cinemas = action.payload;
        },

        [fetchBoxOfficeAction.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchBoxOfficeAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.boxOffice = action.payload;
        },
    },
});

export default homeSlice;

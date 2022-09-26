import { createSlice } from "@reduxjs/toolkit";
import { bookingTicketAction } from "./action";

const initialState = {
    ticketMovie: [],
    loading: false,
    status: false,
};

const bookingSlice = createSlice({
    name: "booking",
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
        [bookingTicketAction.pending]: (state, action) => {
            state.loading = true;
        },
        [bookingTicketAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = true;
        },
    },
});

export default bookingSlice;

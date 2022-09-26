import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";
import bookingSlice from "features/booking/bookingSlice";
import homeSlice from "features/home/homeSlice";
import theaterSlice from "features/theater/theaterSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        theaters: theaterSlice.reducer,
        booking: bookingSlice.reducer,
        middleware: [logger],
    },
});

export default store;

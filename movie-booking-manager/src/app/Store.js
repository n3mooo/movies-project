import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../features/Films/moviesSlice";
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk";
import authReducer from '../features/LogIn/authSlice'
import userReducer from "../features/Users/usersSlice"
import showtimeReducer from "../features/ShowTime/showTimeSlice"
// const store = configureStore({
//     reducer: {
//         //Reducer con
//         moviesList: moviesSlice.reducer,
//     }
// })
const rootReducer  = combineReducers({
    movieList : moviesSlice,
    auth: authReducer,
    user: userReducer,
    showtime: showtimeReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
export default store;
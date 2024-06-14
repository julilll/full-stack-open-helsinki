import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }),
});

export default store;
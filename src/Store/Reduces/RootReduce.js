import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../Reduces/TodoSlice";

export const store = configureStore({
  reducer: {
    todosReducer,
  },
});

// imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";

// reducers
import userSliceReducer from "./user/userSlice.js";

// config store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

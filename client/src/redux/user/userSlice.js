// imports
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: null,
};

// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setUserNull: (state) => {
      state.user = null;
    },
  },
});

// actions
export const { setUser, setUserNull } = userSlice.actions;

// reducer
export default userSlice.reducer;

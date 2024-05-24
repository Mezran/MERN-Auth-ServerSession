// imports
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  username: null,
};

// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
    },
    setUserNull: (state) => {
      state.username = null;
    },
  },
});

// actions
export const { setUser, setUserNull } = userSlice.actions;

// reducer
export default userSlice.reducer;

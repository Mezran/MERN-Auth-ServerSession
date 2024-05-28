import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  messages: [],
  severity: "info",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupState: (state, action) => {
      state.open = action.payload.open;
      state.messages = action.payload.messages;
      state.severity = action.payload.severity;
    },
    setPopupStateHidden: (state) => {
      state.open = false;
    },
  },
});

export const { setPopupState, setPopupStateHidden } = popupSlice.actions;

export default popupSlice.reducer;

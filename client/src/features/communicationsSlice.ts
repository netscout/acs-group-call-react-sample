import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onCall: false,
};

const communicationsSlice = createSlice({
  name: "communications",
  initialState,
  reducers: {
    callStarted(state) {
      state.onCall = true;
    },
    callEnded(state) {
      state.onCall = false;
    },
  },
});

export const { callStarted, callEnded } = communicationsSlice.actions;

export default communicationsSlice.reducer;

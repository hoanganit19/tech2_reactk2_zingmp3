import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playStatus: "pause",
  elementActive: "body",
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    doPlay: (state, action) => {
      state.playStatus = action.payload;
    },
    doActiveElement: (state, action) => {
      state.elementActive = action.payload;
    },
  },
});

export const playerReducer = playerSlice.reducer;
export const playerActions = playerSlice.actions;
export const playerSelector = (state) => state.player;

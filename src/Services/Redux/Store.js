import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "../../Components/Player/playerSlice";

const rootReducer = {
  player: playerReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

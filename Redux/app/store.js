import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/AllGlobalStates";
export const store = configureStore({
  reducer: {
    globalStates: userReducer,
  },
});

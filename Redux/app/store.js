import { configureStore } from "@reduxjs/toolkit";
import allGobalState from "../features/AllGlobalStates";
import User from "../features/UserState";

export const store = configureStore({
  reducer: {
    globalStates: allGobalState,
    userStates: User,
  },
});

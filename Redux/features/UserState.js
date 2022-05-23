import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userVal: null,
};

export const UserSlice = createSlice({
  name: "userStates",
  initialState,
  reducers: {
    setUserVal: (state, action) => {
      state.userVal = action.payload;
    },
  },
});

export const { setUserVal } = UserSlice.actions;

export const selectuserVal = (state) => state.userStates.userVal;

export default UserSlice.reducer;

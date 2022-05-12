import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const GlobalSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;

export default GlobalSlice.reducer;

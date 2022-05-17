import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const GlobalSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items.push(action.payload);
      // state.ItemTotalPrice * state.items.map((d) => d.prices);
    },
    removeItems: (state, action) => {
      let index = state.items.indexOf(action.payload);
      state.items.splice(index, 1);

      // state.quantity -= action.payload
    },
  },
});

export const { setItems, removeItems } = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;
export const selectItemTotalPrice = (state) =>
  state.globalStates.ItemTotalPrice;

export default GlobalSlice.reducer;

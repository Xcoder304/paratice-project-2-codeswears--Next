import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemQty: 0,
  Buyitem: {},
  BuyitemQty: 0,
};

export const GlobalSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items.push(action.payload);
      state.itemQty = state.itemQty + 1;
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
export const selectItemQty = (state) => state.globalStates.itemQty;

export default GlobalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemQty: 0,
  itemForBuy: null,
  itemForBuyQty: 0,
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
    setItemForBuy: (state, action) => {
      state.itemForBuy = action.payload;
    },
    removeItemForBuy: (state, action) => {
      state.itemForBuy = null;
    },
    AddItemForBuyQty: (state, action) => {
      state.itemForBuyQty = state.itemForBuyQty + 1;
    },
    RemoveItemForBuyQty: (state, action) => {
      state.itemForBuyQty = state.itemForBuyQty - 1;

      if (state.itemForBuyQty < 0) {
        state.itemForBuyQty = 0;
      }
    },
  },
});

export const {
  setItems,
  removeItems,
  setItemForBuy,
  removeItemForBuy,
  AddItemForBuyQty,
  RemoveItemForBuyQty,
} = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;
export const selectItemQty = (state) => state.globalStates.itemQty;
export const selectItemForBuy = (state) => state.globalStates.itemForBuy;
export const selectItemForBuyQty = (state) => state.globalStates.itemForBuyQty;

export default GlobalSlice.reducer;

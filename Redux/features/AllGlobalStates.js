import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemQty: 1,
  itemForBuy: [],
};

export const GlobalSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    // ****state for items******
    setItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItems: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    removeAllItems: (state, action) => {
      state.items = [];
    },
    // ************

    // ****state for Item for buy ******
    setItemForBuy: (state, action) => {
      state.itemForBuy = action.payload;
      // state.itemForBuyQty = state.itemForBuyQty = 1;
    },
    clearItemForBuy: (state, action) => {
      state.itemForBuy = [];
      // state.itemForBuyQty = state.itemForBuyQty = 1;
    },
    setSingalItemForBuy: (state, action) => {
      state.itemForBuy.push(action.payload);
      // state.itemForBuyQty = state.itemForBuyQty = 1;
    },
    removeItemForBuy: (state, action) => {
      state.itemForBuy.splice(action.payload, 1);
    },
    // ************

    // *******State for the item qty ****
    setItemQty: (state, action) => {
      state.itemQty = action.payload;
    },
    IncreaseItemQty: (state, action) => {
      state.itemQty = state.itemQty + 1;
    },
    DecreaseItemQty: (state, action) => {
      state.itemQty = state.itemQty - 1;
    },
    // **************
  },
});

export const {
  setItems,
  removeItems,
  removeAllItems,
  removeItemForBuy,
  setItemForBuy,
  setSingalItemForBuy,
  clearItemForBuy,
  setItemQty,
  IncreaseItemQty,
  DecreaseItemQty,
} = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;
export const selectItemQty = (state) => state.globalStates.itemQty;
export const selectItemForBuy = (state) => state.globalStates.itemForBuy;
export default GlobalSlice.reducer;

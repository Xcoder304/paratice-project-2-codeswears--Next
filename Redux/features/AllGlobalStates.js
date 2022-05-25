import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemQty: 0,
  itemForBuy: [],
  itemForBuyQty: 1,
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

    // ****state for itemsQty ******
    setItemQty: (state, action) => {
      state.itemQty = action.payload;
    },

    increaseItemQty: (state, action) => {
      state.itemQty = state.itemQty + 1;
    },
    decreaseItemQty: (state, action) => {
      state.itemQty = state.itemQty - 1;
    },
    // ************

    // ****state for Item for buy ******
    setItemForBuy: (state, action) => {
      state.itemForBuy = action.payload;
      state.itemForBuyQty = state.itemForBuyQty = 1;
    },
    removeItemForBuy: (state, action) => {
      state.itemForBuy.splice(action.payload, 1);
    },
    // ************

    // ****state for Item for buy Qty ******
    AddItemForBuyQty: (state, action) => {
      state.itemForBuyQty = state.itemForBuyQty + 1;
    },
    RemoveItemForBuyQty: (state, action) => {
      state.itemForBuyQty = state.itemForBuyQty - 1;

      if (state.itemForBuyQty <= 1) {
        state.itemForBuyQty = 1;
      }
    },

    // ************
  },
});

export const {
  setItems,
  removeItems,
  removeAllItems,
  setItemQty,
  increaseItemQty,
  decreaseItemQty,
  setItemForBuy,
  removeItemForBuy,
  AddItemForBuyQty,
  RemoveItemForBuyQty,
} = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;
export const selectItemQty = (state) => state.globalStates.itemQty;
export const selectItemForBuy = (state) => state.globalStates.itemForBuy;
export const selectItemForBuyQty = (state) => state.globalStates.itemForBuyQty;
export const selectItemForBuyMsg = (state) => state.globalStates.itemForBuyMsg;

export default GlobalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemQty: 0,
  itemForBuy: [],
  itemForBuyQty: 1,
  AllItemsId: [],
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
    setAllItemsId: (state, action) => {
      state.AllItemsId.push(action.payload);
    },
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
  setSingalItemForBuy,
  clearItemForBuy,
  removeItemForBuy,
  AddItemForBuyQty,
  RemoveItemForBuyQty,
  setAllItemsId,
} = GlobalSlice.actions;

export const selectItems = (state) => state.globalStates.items;
export const selectItemQty = (state) => state.globalStates.itemQty;
export const selectItemForBuy = (state) => state.globalStates.itemForBuy;
export const selectItemForBuyQty = (state) => state.globalStates.itemForBuyQty;
export const selectItemForBuyMsg = (state) => state.globalStates.itemForBuyMsg;
export const selectAllItemsId = (state) => state.globalStates.AllItemsId;
export default GlobalSlice.reducer;

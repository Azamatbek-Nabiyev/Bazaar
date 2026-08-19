import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import type { RootState } from "./index";

interface SavedItemsState {
  items: Product[];
}

const initialState: SavedItemsState = {
  items: [],
};

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    addSavedItem: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeSavedItem: (state, action: PayloadAction<Product["_id"]>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    clearSavedItems: (state) => {
      state.items = [];
    },
  },
});

export const { addSavedItem, removeSavedItem, clearSavedItems } =
  savedItemsSlice.actions;

export default savedItemsSlice.reducer;

// Selectors
export const selectSavedItems = (state: RootState) => state.savedItems.items;

export const selectSavedCount = (state: RootState) =>
  state.savedItems.items.length;

export const selectIsSaved =
  (id: Product["_id"]) =>
  (state: RootState): boolean =>
    state.savedItems.items.some((item) => item._id === id);
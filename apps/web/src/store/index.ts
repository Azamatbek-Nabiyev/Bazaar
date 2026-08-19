import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartReducer from "./cartSlice";
import savedItemsReducer from "./savedItemsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    savedItems: savedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
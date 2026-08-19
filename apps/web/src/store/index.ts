import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartReducer from "./cartSlice";
import savedItemsReducer from "./savedItemsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    savedItems: savedItemsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
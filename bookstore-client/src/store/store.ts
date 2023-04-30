import {
  Middleware,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authApi } from "./authApi";
import toast from "react-hot-toast";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { authSlice } from "./authSlice";
import { booksApi } from "./booksApi";
import { booksApiOpenLibrary } from "./bookApiOpenLibrary";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && !action.type.includes("Internal")) {
    // if (
    //   action.payload?.data?.message !== "Resource not found." &&
    //   action.payload?.data?.message !== ""
    // ) {
    //   toast.error(action.payload?.data?.message);
    // }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [booksApiOpenLibrary.reducerPath]: booksApiOpenLibrary.reducer,
    auth: authSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware): any => [
    ...getDefaultMiddleware(),
    authApi.middleware,
    booksApi.middleware,
    booksApiOpenLibrary.middleware,
    rtkQueryErrorLogger,
  ],
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

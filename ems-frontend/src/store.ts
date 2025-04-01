import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./services/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "api/executeQuery/fulfilled",
          "api/subscriptions/unsubscribeQueryResult",
        ],
        ignoredPaths: ["api.queries", "api.mutations", "payload.blob"],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

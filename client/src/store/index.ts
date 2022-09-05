import { configureStore } from "@reduxjs/toolkit";
import storeItemsSlice from "./storeItems";
import storeUser from "./storeUser";

const store = configureStore({
  reducer: {
    store: storeItemsSlice,
    user: storeUser,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

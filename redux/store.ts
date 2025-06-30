import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import inventoryReducer from "./inventorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

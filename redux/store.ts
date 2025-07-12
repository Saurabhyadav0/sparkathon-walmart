import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import inventoryReducer from "./inventorySlice";
import donationReducer from "./donationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
     donation: donationReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

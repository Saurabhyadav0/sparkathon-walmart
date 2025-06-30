import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expiry: string;
  status?: "ok" | "risk" | "expired";
}

interface InventoryState {
  items: InventoryItem[];
}

const initialState: InventoryState = {
  items: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory(state, action: PayloadAction<InventoryItem[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<InventoryItem>) {
      state.items.push(action.payload);
    },
  },
});

export const { setInventory, addItem } = inventorySlice.actions;
export default inventorySlice.reducer;

// store/recommendationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  loading: boolean;
  done: boolean;
}

interface RecommendationState {
  [itemId: string]: CardState;
}

const initialState: RecommendationState = {};

const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    startAction(state, action: PayloadAction<string>) {
      const id = action.payload;
      state[id] = { loading: true, done: false };
    },
    completeAction(state, action: PayloadAction<string>) {
      const id = action.payload;
      state[id] = { loading: false, done: true };
    },
    resetAction(state, action: PayloadAction<string>) {
      const id = action.payload;
      state[id] = { loading: false, done: false };
    },
  },
});

export const { startAction, completeAction, resetAction } = recommendationSlice.actions;
export default recommendationSlice.reducer;

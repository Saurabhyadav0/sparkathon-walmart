import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Donation {
  id: number;
  donorLocationId: number;
  pounds: number;
  donationCategoryId: number;
}

interface DonationState {
  donations: Donation[];
}

const initialState: DonationState = {
  donations: [],
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    addDonation: (state, action: PayloadAction<Donation>) => {
      state.donations.push(action.payload);
    },
  },
});

export const { addDonation } = donationSlice.actions;
export default donationSlice.reducer;

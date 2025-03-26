import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const barbersSlice = createSlice({
  name: "barbers",
  initialState,
  reducers: {
    setbarbers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setbarbers, removebarbers } = barbersSlice.actions;

export default barbersSlice.reducer;

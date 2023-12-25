import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = templateSlice.actions;

export default templateSlice.reducer;

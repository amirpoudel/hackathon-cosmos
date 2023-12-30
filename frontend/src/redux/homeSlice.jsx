import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "src/config/base_url";

const initialState = {
  isRestaurantListLoading: false,
  restaurantList: [],
  restaurantListError: null,
};

export const fetchRestaurantListAsync = createAsyncThunk(
  "home/fetchRestaurantListAsync",
  async ({ searchQuery }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant?search=${searchQuery}`
      );
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err?.response?.data?.message || "Could Not Load";
      return rejectWithValue(errorMessage);
    }
  }
);
export const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantListAsync.pending, (state) => {
        state.isRestaurantListLoading = true;
      })
      .addCase(fetchRestaurantListAsync.fulfilled, (state, action) => {
        state.isRestaurantListLoading = false;
        state.restaurantList = action.payload?.data;
      })
      .addCase(fetchRestaurantListAsync.rejected, (state, action) => {
        state.isRestaurantListLoading = false;
        state.restaurantListError = action.payload;
      });
  },
});

// export const { increment } = homeSlice.actions;

export default homeSlice.reducer;

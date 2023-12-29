import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isRestaurantListLoading: false,
  restaurantList: [],
  restaurantListError: null,
};

export const fetchRestaurantListAsync = createAsyncThunk(
  "home/fetchRestaurantListAsync",
  async ({ searchQuery }, { rejectWithValue }) => {
    try {
      console.log(searchQuery);
      const response = await axios.get(
        `${BASE_URL}/restaurant?search${searchQuery}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Could Not Load";
      return rejectWithValue(errorMessage);
    }
  }
);
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
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

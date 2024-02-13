import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isOrderStatusLoading: false,

  orderedStatus: "",
  customerPhoneNumber: "",
};

export const fetchOrderStatusAsync = createAsyncThunk(
  "nav/fetchOrderStatusAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order/track/${initialState.customerPhoneNumber}`
      );
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrderedStatus: (state, action) => {
      state.orderedStatus = action.payload;
    },
    setCustomerPhoneNumber: (state, action) => {
      console.log("action", action);
      state.customerPhoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatusAsync.pending, (state) => {
        state.isOrderStatusLoading = true;
      })
      .addCase(fetchOrderStatusAsync.fulfilled, (state, action) => {
        state.isOrderStatusLoading = true;
        state.orderedStatus = action.payload?.data?.status;
      })
      .addCase(fetchOrderStatusAsync.rejected, (state, action) => {
        state.isOrderStatusLoading = false;
      });
  },
});

export const { setCustomerPhoneNumber, setOrderedStatus } = navSlice.actions;

export default navSlice.reducer;

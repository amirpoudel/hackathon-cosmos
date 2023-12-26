import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "src/config/base_url";

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [],

  filteredFoodList: [],
  isFoodListLoading: false,
  foodListError: null,

  isAddOrderLoading: false,
  addOrderError: null,

  orderedStatus: "",
  customerPhoneNumber: "",

  isOrderStatusLoading: false,
};

export const fetchCategoryList = createAsyncThunk(
  "home/fetchCategoryList",
  async ({ userName, tableNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/menu/${userName}/${tableNumber}`
      );
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
export const fetchOrderStatusAsync = createAsyncThunk(
  "home/fetchOrderStatusAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order/track/${state.customerPhoneNumber}`
      );
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

export const addOrderAsync = createAsyncThunk(
  "home/addOrderAsync",
  async ({ userName, tableNumber, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order/${userName}/${tableNumber}`,
        data
      );
      console.log("response", response);
      if (response.status === 200) {
        toast.success("🍜 Order Placed !", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return response.data;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setOrderedStatus: (state, action) => {
      state.orderedStatus = action.payload;
    },
    setCustomerPhoneNumber: (state, action) => {
      state.customerPhoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryList.pending, (state) => {
      state.isCategoryListLoading = true;
    });
    builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
      state.categoryList = action.payload?.data;
      state.filteredCategoryList = action.payload?.data;
      state.isCategoryListLoading = false;
    });
    builder.addCase(fetchCategoryList.rejected, (state, action) => {
      state.isCategoryListLoading = false;
      state.categoryListError = action.payload;
    });
    builder.addCase(fetchOrderStatusAsync.pending, (state) => {
      state.isOrderStatusLoading = true;
    });
    builder.addCase(fetchOrderStatusAsync.fulfilled, (state, action) => {
      state.isOrderStatusLoading = true;
      state.orderedStatus = action.payload?.data?.status;
    });
    builder.addCase(fetchOrderStatusAsync.rejected, (state, action) => {
      state.isCategoryListLoading = false;
      state.categoryListError = action.payload;
    });
    builder.addCase(addOrderAsync.pending, (state) => {
      state.isAddOrderLoading = true;
    });
    builder.addCase(addOrderAsync.fulfilled, (state) => {
      state.isAddOrderLoading = false;
    });
    builder.addCase(addOrderAsync.rejected, (state) => {
      state.isAddOrderLoading = false;
    });
  },
});
export const { setCustomerPhoneNumber, setOrderedStatus } = homeSlice.actions;

export default homeSlice.reducer;

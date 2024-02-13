import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "src/config/base_url";

const initialState = {
  isShowCategoryListLoading: false,
  showCategoryList: [],
  showCategoryListError: null,

  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [],

  filteredFoodList: [],
  isFoodListLoading: false,
  foodListError: null,

  isAddOrderLoading: false,
  addOrderError: null,
};

export const fetchShowCategoryList = createAsyncThunk(
  "restaurantMenu/fetchShowCategoryList",
  async ({ userName }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/${userName}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Unable to fetch category";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategoryList = createAsyncThunk(
  "restaurantMenu/fetchCategoryList",
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

export const addOrderAsync = createAsyncThunk(
  "restaurantMenu/addOrderAsync",
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

const restaurantMenuSlice = createSlice({
  name: "restaurantMenu",
  initialState,

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
    builder.addCase(fetchShowCategoryList.pending, (state) => {
      state.isShowCategoryListLoading = true;
    });
    builder.addCase(fetchShowCategoryList.fulfilled, (state, action) => {
      state.showCategoryList = action.payload?.data;
      state.categoryList = action.payload?.data;
      state.filteredCategoryList = action.payload?.data;
      state.isShowCategoryListLoading = false;
    });
    builder.addCase(fetchShowCategoryList.rejected, (state, action) => {
      state.isShowCategoryListLoading = false;
      state.showCategoryListError = action.payload;
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
export const { setCustomerPhoneNumber, setOrderedStatus } =
  restaurantMenuSlice.actions;

export default restaurantMenuSlice.reducer;

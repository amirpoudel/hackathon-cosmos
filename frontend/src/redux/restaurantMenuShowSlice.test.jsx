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
};

export const fetchCategoryList = createAsyncThunk(
  "restaurantMenuShow/fetchCategoryList",
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
  "restaurantMenuShow/addOrderAsync",
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

const restaurantMenuShowSlice = createSlice({
  name: "restaurantMenuShow",
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
  restaurantMenuShowSlice.actions;

export default restaurantMenuShowSlice.reducer;

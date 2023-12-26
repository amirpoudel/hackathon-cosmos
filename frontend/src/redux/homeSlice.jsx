import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "src/config/base_url";

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [
    {
      _id: "6589b0362e6b59d1afaf8f86",
      name: "momos",
      description: "Most Famous Nepali Dish Amongs Nepali And OutSiders",
      items: [
        {
          name: "chicken momo",
          price: 180,
          description: "This is nepali chicken momo",
          flags: {
            isVeg: false,
            containsEggs: false,
            isSpecial: false,
            isRecommended: false,
            isAvailable: true,
          },
          imageLink:
            "https://res.cloudinary.com/dekoq3dmf/image/upload/v1703524612/f19my1ufrq7zyclgygtp.jpg",
        },
        {
          name: "chicken  fry momo",
          price: 190,
          description: "This is nepali chicken momo",
          flags: {
            isVeg: false,
            containsEggs: false,
            isSpecial: false,
            isRecommended: false,
            isAvailable: true,
          },
          imageLink:
            "https://res.cloudinary.com/dekoq3dmf/image/upload/v1703526666/yvnsx9j7kqipdy2lbmsd.jpg",
        },
        {
          name: "chicken  jhol momo",
          price: 180,
          description: "This is nepali chicken momo",
          flags: {
            isVeg: false,
            containsEggs: false,
            isSpecial: false,
            isRecommended: false,
            isAvailable: true,
          },
          imageLink:
            "https://res.cloudinary.com/dekoq3dmf/image/upload/v1703526683/tgrvhswvzdb5zwl7c1ml.jpg",
        },
      ],
      itemsCount: 3,
    },
    {
      _id: "6589bfffbe6fa3ad08f76920",
      name: "Nepali Khana Set",
      description: "Nepali Authentic Khana Set",
      items: [],
      itemsCount: 0,
    },
  ],
  filteredFoodList: [],
  isFoodListLoading: false,
  foodListError: null,
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
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setFilterFoodList: (state, action) => {
      if (action.payload === "All") {
        state.filteredFoodList = state.foodList;
      } else {
        state.filteredFoodList = state.foodList.filter(
          (item) => item.menuCategory.name === action.payload
        );
      }
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
  },
});
export const { setFilterFoodList } = homeSlice.actions;
export default homeSlice.reducer;

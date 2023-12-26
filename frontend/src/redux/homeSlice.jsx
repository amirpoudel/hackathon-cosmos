import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "src/config/base_url";

const initialState = {
  foodList: [
    {
      itemID: 1,
      name: "Chicken Steam Momo",
      price: 160,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "momo",
      },
    },
    {
      itemID: 2,
      name: "Fried Momo",
      price: 200,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "momo",
      },
    },
    {
      itemID: 3,
      name: "Chicken Pizza",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Pizza",
      },
    },
    {
      itemID: 4,
      name: "Cheezy Pizza",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Pizza",
      },
    },
    {
      itemID: 5,
      name: "Base Pizza",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Pizza",
      },
    },
    {
      itemID: 6,
      name: "Dami Pizza",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Pizza",
      },
    },
    {
      itemID: 7,
      name: "Veg Pizza",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Pizza",
      },
    },
    {
      itemID: 8,
      name: "Coke",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Drinks",
      },
    },
    {
      itemID: 9,
      name: "Noodle",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Snacks",
      },
    },
    {
      itemID: 10,
      name: "Noodle",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Snacks",
      },
    },
    {
      itemID: 11,
      name: "Veg",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Veg",
      },
    },
    {
      itemID: 12,
      name: "Chicken",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Non Veg",
      },
    },
    {
      itemID: 13,
      name: "Salad",
      price: 260,
      description: "",
      image: "uploads/food/chikenMomo_4.jpeg",
      menuCategory: {
        name: "Salad",
      },
    },
  ],
  filteredFoodList: [],
  isFoodListLoading: false,
  foodListError: null,
};

export const fetchFoodList = createAsyncThunk(
  "home/fetchFoodList",
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
    builder.addCase(fetchFoodList.pending, (state) => {
      state.isFoodListLoading = true;
    });
    builder.addCase(fetchFoodList.fulfilled, (state, action) => {
      state.foodList = action.payload;
      state.filteredFoodList = action.payload;
      state.isFoodListLoading = false;
    });
    builder.addCase(fetchFoodList.rejected, (state, action) => {
      state.isFoodListLoading = false;
      state.foodListError = action.payload;
    });
  },
});
export const { setFilterFoodList } = homeSlice.actions;
export default homeSlice.reducer;

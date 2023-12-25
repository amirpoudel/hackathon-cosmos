import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [
    {
      id: 1,
      name: 'category1',
    },
    {
      id: 2,
      name: 'category2',
    },
  ],

  // states when adding new category
  isCategoryLoading: false,
  categoryError: null,

  isFoodItemLoading: false,
  foodItemError: null,
};

export const fetchCategoryList = createAsyncThunk(
  'menu/fetchCategoryList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/category`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

export const addNewCategory = createAsyncThunk(
  'menu/addNewCategory',
  async (category, { rejectWithValue }) => {
    try {
      console.log(category);
      const response = await axios.post(`${BASE_URL}/menu/category`, { category });
      if (response.status === 200) {
        toast.success('🍜 Category Added Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return category;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to add category';
      toast.error(`🍜 ${errorMessage}`, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

export const addNewFoodItem = createAsyncThunk(
  'menu/addNewFoodItem',
  async (formData, { rejectWithValue }) => {
    console.log([...formData.entries()]);

    try {
      const response = await axios.post(`${BASE_URL}/menu/item`, formData);
      console.log('new item response', response);
      if (response.status === 200) {
        toast.success('🍜 Item Added Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to add item';
      toast.error(`🍜 ${errorMessage}`, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state) => {
        state.isCategoryListLoading = true;
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategoryList.rejected, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryListError = action.payload;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state) => {
        state.isCategoryLoading = false;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.categoryError = action.payload;
      })
      .addCase(addNewFoodItem.pending, (state) => {
        state.isFoodItemLoading = true;
      })
      .addCase(addNewFoodItem.fulfilled, (state, action) => {
        state.isFoodItemLoading = false;
      })
      .addCase(addNewFoodItem.rejected, (state, action) => {
        state.isFoodItemLoading = false;
        state.foodItemError = action.payload;
      });
  },
});

export default menuSlice.reducer;

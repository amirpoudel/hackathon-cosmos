import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [
    {
      _id: 1,
      name: 'all',
    },
    {
      _id: 2,
      name: 'category1',
    },
    {
      _id: 3,
      name: 'category2',
    },
  ],

  // states when adding new category
  isCategoryLoading: false,
  categoryError: null,

  isFoodItemLoading: false,
  foodItemError: null,
  foodItemList: [
    {
      flags: {
        isVeg: false,
        containsEggs: false,
        isSpecial: false,
        isRecommended: false,
        isAvailable: true,
      },
      _id: '6589b903a56fd7d204f33581',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      categoryId: '6589b0362e6b59d1afaf8f86',
      name: 'chicken momo',
      price: 180,
      discountPercentage: 10,
      description: 'This is nepali chicken momo',
      imageLink:
        'https://res.cloudinary.com/dekoq3dmf/image/upload/v1703524612/f19my1ufrq7zyclgygtp.jpg',
      createdAt: '2023-12-25T17:16:51.223Z',
      updatedAt: '2023-12-25T17:16:52.844Z',
      __v: 0,
    },
    {
      flags: {
        isVeg: false,
        containsEggs: false,
        isSpecial: false,
        isRecommended: false,
        isAvailable: true,
      },
      _id: '6589c109e98b7927596a8b83',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      categoryId: '6589b0362e6b59d1afaf8f86',
      name: 'chicken  fry momo',
      price: 190,
      discountPercentage: 0,
      description: 'This is nepali chicken momo',
      imageLink:
        'https://res.cloudinary.com/dekoq3dmf/image/upload/v1703526666/yvnsx9j7kqipdy2lbmsd.jpg',
      createdAt: '2023-12-25T17:51:05.684Z',
      updatedAt: '2023-12-25T17:51:07.325Z',
      __v: 0,
    },
    {
      flags: {
        isVeg: false,
        containsEggs: false,
        isSpecial: false,
        isRecommended: false,
        isAvailable: true,
      },
      _id: '6589c11ae98b7927596a8b88',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      categoryId: '6589b0362e6b59d1afaf8f86',
      name: 'chicken  jhol momo',
      price: 180,
      discountPercentage: 0,
      description: 'This is nepali chicken momo',
      imageLink:
        'https://res.cloudinary.com/dekoq3dmf/image/upload/v1703526683/tgrvhswvzdb5zwl7c1ml.jpg',
      createdAt: '2023-12-25T17:51:22.595Z',
      updatedAt: '2023-12-25T17:51:23.720Z',
      __v: 0,
    },
  ],
};

export const fetchCategoryListAsync = createAsyncThunk(
  'menu/fetchCategoryListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/category`, {
        withCredentials: true,
      });
      console.log(response)
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

export const addNewCategoryAsync = createAsyncThunk(
  'menu/addNewCategoryAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/menu/category`, data, {
        withCredentials: true,
      });
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
        return response.data;
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
export const editCategoryAsync = createAsyncThunk(
  'menu/editCategoryAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/menu/category`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('🍜 Category Edited Successfully!', {
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
      const errorMessage = err?.response?.data?.message || 'Failed to edit category';
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
      const response = await axios.post(`${BASE_URL}/menu/item`, formData, {
        withCredentials: true,
      });
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
      .addCase(fetchCategoryListAsync.pending, (state) => {
        state.isCategoryListLoading = true;
      })
      .addCase(fetchCategoryListAsync.fulfilled, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryList = action.payload?.data;
      })
      .addCase(fetchCategoryListAsync.rejected, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryListError = action.payload;
      })
      .addCase(addNewCategoryAsync.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(addNewCategoryAsync.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        const newCategory = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        state.categoryList = [...state.categoryList, newCategory];
      })
      .addCase(addNewCategoryAsync.rejected, (state, action) => {
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
      })
      .addCase(editCategoryAsync.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(editCategoryAsync.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        const newCategory = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        const indexToUpdate = state.categoryList.findIndex(
          (category) => category.id === newCategory.id
        );

        if (indexToUpdate !== -1) {
          state.categoryList[indexToUpdate] = newCategory;
        } else {
          state.categoryList = [...state.categoryList, newCategory];
        }
      })
      .addCase(editCategoryAsync.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.categoryError = action.payload;
      });
  },
});

export default menuSlice.reducer;

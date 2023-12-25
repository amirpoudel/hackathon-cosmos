import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isOrderListLoading: false,
  orderList: [],
  orderLisError: null,
};

export const fetchOrderListAsync = createAsyncThunk(
  'menu/fetchOrderListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/table`);
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

export const updateOrderAsync = createAsyncThunk(
  'menu/updateOrderAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/menu/category`, data);
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderListAsync.pending, (state) => {
        state.isOrderListLoading = true;
      })
      .addCase(fetchOrderListAsync.fulfilled, (state, action) => {
        state.isOrderListLoading = false;
        state.orderList = action.payload;
      })
      .addCase(fetchOrderListAsync.rejected, (state, action) => {
        state.isOrderListLoading = false;
        state.orderLisError = action.payload;
      })

      .addCase(updateOrderAsync.pending, (state) => {
        state.isEditTableLoading = true;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.isEditTableLoading = false;
        const newTable = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        const indexToUpdate = state.tableList.findIndex((category) => category.id === newTable.id);

        if (indexToUpdate !== -1) {
          state.categoryList[indexToUpdate] = newTable;
        } else {
          state.categoryList = [...state.tableList, newTable];
        }
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.isEditTableLoading = false;
        state.editTableError = action.payload;
      });
  },
});

export default orderSlice.reducer;

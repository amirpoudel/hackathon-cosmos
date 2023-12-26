import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isTableListLoading: false,
  tableList: [
    {
      _id: '6589d99d04aebb7f750aaa8c',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 1,
      restaurantUsername: 'hamrolumbini',
      orderCount: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    },
    {
      _id: '6589d9a304aebb7f750aaa8f',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 2,
      restaurantUsername: 'hamrolumbini',
      orderCount: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    },
    {
      _id: '6589d9a604aebb7f750aaa92',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 3,
      restaurantUsername: 'hamrolumbini',
      orderCount: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    },
    {
      _id: '6589d9a804aebb7f750aaa95',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 4,
      restaurantUsername: 'hamrolumbini',
      orderCount: 1,
      totalAmount: 532,
      paidAmount: 0,
      unpaidAmount: 0,
    },
    {
      _id: '6589d9ab04aebb7f750aaa98',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 5,
      restaurantUsername: 'hamrolumbini',
      orderCount: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    },
    {
      _id: '6589d9ae04aebb7f750aaa9b',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableNumber: 6,
      restaurantUsername: 'hamrolumbini',
      orderCount: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    },
  ],
  tableListError: null,

  isAddTableLoading: false,
  addTableError: null,

  isEditTableLoading: false,
  editTableError: null,
};

export const fetchTableListAsync = createAsyncThunk(
  'menu/fetchTableListAsync',
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

export const addTableAsync = createAsyncThunk(
  'menu/addTableAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/table`, data);
      if (response.status === 200) {
        toast.success('🍜 Table Created Successfully!', {
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
export const editTableAsync = createAsyncThunk(
  'menu/editTableAsync',
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

const tableSlice = createSlice({
  name: 'table',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableListAsync.pending, (state) => {
        state.isTableListLoading = true;
      })
      .addCase(fetchTableListAsync.fulfilled, (state, action) => {
        state.isTableListLoading = false;
        state.tableList = action.payload;
      })
      .addCase(fetchTableListAsync.rejected, (state, action) => {
        state.isTableListLoading = false;
        state.tableListError = action.payload;
      })
      .addCase(addTableAsync.pending, (state) => {
        state.isAddTableLoading = true;
      })
      .addCase(addTableAsync.fulfilled, (state, action) => {
        state.isAddTableLoading = false;
        const newTable = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        state.tableList = [...state.tableList, newTable];
      })
      .addCase(addTableAsync.rejected, (state, action) => {
        state.isAddTableLoading = false;
        state.addTableError = action.payload;
      })

      .addCase(editTableAsync.pending, (state) => {
        state.isEditTableLoading = true;
      })
      .addCase(editTableAsync.fulfilled, (state, action) => {
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
      .addCase(editTableAsync.rejected, (state, action) => {
        state.isEditTableLoading = false;
        state.editTableError = action.payload;
      });
  },
});

export default tableSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isOrderListLoading: false,
  orderList: [
    {
      _id: '6589dac504aebb7f750aaaa5',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableId: '6589d9ab04aebb7f750aaa98',
      phoneNumber: '9822540076',
      totalAmount: 1254,
      status: 'served',
      paymentStatus: 'paid',
      tableNumber: 5,
      orderItems: [
        {
          itemId: '6589b903a56fd7d204f33581',
          quantity: 2,
          price: 162,
          totalAmount: 324,
          itemName: 'chicken momo',
        },
        {
          itemId: '6589c109e98b7927596a8b83',
          quantity: 3,
          price: 190,
          totalAmount: 570,
          itemName: 'chicken  fry momo',
        },
        {
          itemId: '6589c11ae98b7927596a8b88',
          quantity: 2,
          price: 180,
          totalAmount: 360,
          itemName: 'chicken  jhol momo',
        },
      ],
    },
    {
      _id: '6589e448fb9dbf7ed63f880a',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableId: '6589d9ab04aebb7f750aaa98',
      phoneNumber: '9822540076',
      totalAmount: 532,
      orderNote: 'Piro Ali Kam Hai',
      status: 'pending',
      paymentStatus: 'unpaid',
      tableNumber: 5,
      orderItems: [
        {
          itemId: '6589b903a56fd7d204f33581',
          quantity: 1,
          price: 162,
          totalAmount: 162,
          itemName: 'chicken momo',
        },
        {
          itemId: '6589c109e98b7927596a8b83',
          quantity: 1,
          price: 190,
          totalAmount: 190,
          itemName: 'chicken  fry momo',
        },
        {
          itemId: '6589c11ae98b7927596a8b88',
          quantity: 1,
          price: 180,
          totalAmount: 180,
          itemName: 'chicken  jhol momo',
        },
      ],
    },
    {
      _id: '6589f2f06b0a4c3629d14dbe',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableId: '6589d9a804aebb7f750aaa95',
      phoneNumber: '9822540076',
      totalAmount: 532,
      orderNote: 'Piro Ali Kam Hai',
      status: 'pending',
      paymentStatus: 'unpaid',
      tableNumber: 4,
      orderItems: [
        {
          itemId: '6589b903a56fd7d204f33581',
          quantity: 1,
          price: 162,
          totalAmount: 162,
          itemName: 'chicken momo',
        },
        {
          itemId: '6589c109e98b7927596a8b83',
          quantity: 1,
          price: 190,
          totalAmount: 190,
          itemName: 'chicken  fry momo',
        },
        {
          itemId: '6589c11ae98b7927596a8b88',
          quantity: 1,
          price: 180,
          totalAmount: 180,
          itemName: 'chicken  jhol momo',
        },
      ],
    },
    {
      _id: '658a0133c5abf8969c2cf5d8',
      restaurantId: '6589b0162e6b59d1afaf8f7e',
      tableId: '6589d99d04aebb7f750aaa8c',
      phoneNumber: '9822540076',
      totalAmount: 532,
      orderNote: 'Piro Ali Kam Hai',
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: '2023-12-25T22:24:51.809Z',
      updatedAt: '2023-12-25T22:24:51.809Z',
      tableNumber: 1,
      orderItems: [
        {
          itemId: '6589b903a56fd7d204f33581',
          quantity: 1,
          price: 162,
          totalAmount: 162,
          itemName: 'chicken momo',
        },
        {
          itemId: '6589c109e98b7927596a8b83',
          quantity: 1,
          price: 190,
          totalAmount: 190,
          itemName: 'chicken  fry momo',
        },
        {
          itemId: '6589c11ae98b7927596a8b88',
          quantity: 1,
          price: 180,
          totalAmount: 180,
          itemName: 'chicken  jhol momo',
        },
      ],
    },
  ],
  orderLisError: null,
};

export const fetchOrderListAsync = createAsyncThunk(
  'menu/fetchOrderListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/table`, { withCredentials: true });
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
      console.log('data', data);
      const response = await axios.patch(`${BASE_URL}/order`, data, { withCredentials: true });
      if (response.status === 200) {
        toast.success('🍜 ok xa ta!', {
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

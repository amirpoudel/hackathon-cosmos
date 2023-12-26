import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isTableListLoading: false,
  tableList: [],
  tableListError: null,

  isAddTableLoading: false,
  addTableError: null,

  isEditTableLoading: false,
  editTableError: null,

  isDeleteTableLoading: false,
  deleteTableError: null,
};

export const fetchTableListAsync = createAsyncThunk(
  'menu/fetchTableListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/table`, { withCredentials: true });
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
      const response = await axios.post(`${BASE_URL}/table`, data, { withCredentials: true });
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
      const errorMessage = err?.response?.data?.message || 'Failed to add table';
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
export const deleteTableByAsyncById = createAsyncThunk(
  'menu/deleteTableByAsyncById',
  async ({ tableId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/table/${tableId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('🍜 Table Deleted Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return tableId;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to delete table';
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
      const response = await axios.patch(`${BASE_URL}/table`, data, { withCredentials: true });
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
        state.tableList = action.payload?.data;
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
      .addCase(deleteTableByAsyncById.pending, (state) => {
        state.isDeleteTableLoading = true;
      })
      .addCase(deleteTableByAsyncById.fulfilled, (state, action) => {
        state.isDeleteTableLoading = false;
        state.tableList = state.tableList.filter((table) => table._id !== action.payload);
      })
      .addCase(deleteTableByAsyncById.rejected, (state, action) => {
        state.isDeleteTableLoading = false;
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

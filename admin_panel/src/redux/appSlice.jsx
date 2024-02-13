import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'src/config/base_url';

const initialState = {
  appDetails: {},
  isAppDetailsLoading: false,

  isDailyRevenueDetailsLoading: false,
  dailyRevenueDetails: {},

  isOrderStatsLoading: false,
  orderStatsDetails: [],

  isTaskListLoading: false,
  taskList: [],
};

export const fetchAppViewAsync = createAsyncThunk(
  'app/fetchAppViewAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/stats`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const fetchDailyRevenueAsync = createAsyncThunk(
  'app/fetchDailyRevenueAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/dayAmount`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const fetchOrderStatsAsync = createAsyncThunk(
  'app/fetchOrderStatsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/totalSales`, { withCredentials: true });
      console.log('this is sales', response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

export const fetchTaskListAsync = createAsyncThunk(
  'app/fetchTaskListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'No Task';
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppViewAsync.pending, (state, action) => {
        state.isAppDetailsLoading = true;
      })
      .addCase(fetchAppViewAsync.fulfilled, (state, action) => {
        state.isAppDetailsLoading = false;
        state.appDetails = action?.payload?.data[0];
      })
      .addCase(fetchAppViewAsync.rejected, (state) => {
        state.isAppDetailsLoading = false;
      })
      .addCase(fetchDailyRevenueAsync.pending, (state, action) => {
        state.isDailyRevenueDetailsLoading = true;
      })
      .addCase(fetchDailyRevenueAsync.fulfilled, (state, action) => {
        state.isDailyRevenueDetailsLoading = false;
        state.dailyRevenueDetails = action?.payload?.data[0];
      })
      .addCase(fetchDailyRevenueAsync.rejected, (state) => {
        state.isDailyRevenueDetailsLoading = false;
      })
      .addCase(fetchOrderStatsAsync.pending, (state, action) => {
        state.isOrderStatsLoading = true;
      })
      .addCase(fetchOrderStatsAsync.fulfilled, (state, action) => {
        state.isOrderStatsLoading = false;

        state.orderStatsDetails = action?.payload?.data;
      })
      .addCase(fetchOrderStatsAsync.rejected, (state) => {
        state.isOrderStatsLoading = false;
      })
      .addCase(fetchTaskListAsync.pending, (state, action) => {
        state.isTaskListLoading = true;
      })
      .addCase(fetchTaskListAsync.fulfilled, (state, action) => {
        state.isTaskListLoading = false;

        state.taskList = action?.payload?.data;
      })
      .addCase(fetchTaskListAsync.rejected, (state) => {
        state.isTaskListLoading = false;
      });
  },
});

export default appSlice.reducer;

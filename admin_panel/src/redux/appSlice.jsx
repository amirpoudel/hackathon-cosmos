import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'src/config/base_url';

const initialState = {
  appDetails: {},
  isAppDetailsLoading: false,
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

export const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppViewAsync.pending, (state, action) => {
        state.isAppDetailsLoading = true;
      })
      .addCase(fetchAppViewAsync.fulfilled, (state, action) => {
        state.appDetails = action?.payload?.data[0];
      })
      .addCase(fetchAppViewAsync.rejected, (state) => {
        state.isAppDetailsLoading = false;
      });
  },
});

export default appSlice.reducer;

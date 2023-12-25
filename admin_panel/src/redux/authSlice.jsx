import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'src/config/base_url';

const initialState = {
  user: null,
  isAuthenticated: false,
  role: '',

  isLoginLoading: false,
  loginError: null,

  isRegisterLoading: false,
  registerError: null,

  isLogoutLoading: false,
};

// Restaurant LOGIN
export const loginRestaurantAsync = createAsyncThunk(
  'auth/loginRestaurantAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = axios.post(`${BASE_URL}/user/login`);
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To Login';
      return rejectWithValue(errorMessage);
    }
  }
);

// Restaurant Register
export const registerRestaurantAsync = createAsyncThunk(
  'auth/registerRestaurantAsync',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = axios.post(`${BASE_URL}/user/register`);
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To Register';
      return rejectWithValue(errorMessage);
    }
  }
);

// Restaurant Logout
export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, { rejectWithValue }) => {
  try {
    const response = axios.post(`${BASE_URL}/logout`);
    if (response.status === 200) {
      return response.data;
    }
    return '';
  } catch (err) {
    const errorMessage = err?.response?.data?.message || 'Unable To Logout';
    return rejectWithValue(errorMessage);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRestaurantAsync.pending, (state, action) => {
        state.isLoginLoading = true;
      })
      .addCase(loginRestaurantAsync.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginRestaurantAsync.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      })

      .addCase(registerRestaurantAsync.pending, (state, action) => {
        state.isRegisterLoading = true;
      })
      .addCase(registerRestaurantAsync.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerRestaurantAsync.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = action.payload;
      })

      .addCase(logoutAsync.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isLogoutLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLogoutLoading = false;
      });
  },
});
export const { setRole } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL } from 'src/config/base_url';

const initialState = {
  userName: '',
  userEmail: '',
  userPhone: '',

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
      const response = await axios.post(`${BASE_URL}/user/login`, data);
      if (response.statusCode === 200) {
        toast.success('🍜 Login Success !', {
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
      const errorMessage = err?.response?.data?.message || 'Unable To Login';
      toast.error(errorMessage, {
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
    return '';
  }
);

// Restaurant Register
export const registerRestaurantAsync = createAsyncThunk(
  'auth/registerRestaurantAsync',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, data);
      if (response.statusCode === 200) {
        toast.success('🍜 Registration Success  !', {
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
      const errorMessage = err?.response?.data?.message || 'Unable To Register';
      toast.success(errorMessage, {
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
    return '';
  }
);

// Restaurant Logout
export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    if (response.statusCode === 200) {
      toast.success('🍜 Logout Success  !', {
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
    const errorMessage = err?.response?.data?.message || 'Unable To Logout';
    toast.success(errorMessage, {
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
  return '';
});
const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(loginRestaurantAsync.pending, (state, action) => {
        state.isLoginLoading = true;
      })
      .addCase(loginRestaurantAsync.fulfilled, (state, action) => {
        const userData = action.payload?.data?.user;
        if (userData) {
          state.isLoginLoading = false;
          state.isAuthenticated = true;
          state.role = userData?.role;
          state.userName = userData?.name;
          state.userEmail = userData?.email;
          state.userPhone = userData?.phone;
        }
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
export default authSlice.reducer;

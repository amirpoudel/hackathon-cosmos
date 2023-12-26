import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    table: tableReducer,
    order: orderReducer,
  },
});

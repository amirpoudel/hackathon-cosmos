import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    table: tableReducer,
    order: orderReducer,
    app: appReducer,
  },
});

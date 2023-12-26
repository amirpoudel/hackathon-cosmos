import { configureStore } from "@reduxjs/toolkit";

import templateReducer from "./templateSlice";
import homeReducer from "./homeSlice";

export const store = configureStore({
  reducer: {
    template: templateReducer,
    home: homeReducer,
  },
});

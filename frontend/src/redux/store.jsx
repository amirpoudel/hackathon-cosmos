import { configureStore } from "@reduxjs/toolkit";

// import templateReducer from "./templateSlice";
import navReducer from "./navSlice";
import homeReducer from "./homeSlice";

import restaurantMenuReducer from "./restaurantMenuSlice";

export const store = configureStore({
  reducer: {
    // template: templateReducer,
    nav: navReducer,
    restaurantMenu: restaurantMenuReducer,
    home: homeReducer,
  },
});

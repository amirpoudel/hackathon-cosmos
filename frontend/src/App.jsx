import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import RootLayout from "src/layout/root_layout";

import RestaurantOrderMenuPage from "src/pages/restaurant/restaurant_order_menu_page";
import RestaurantShowMenuPage from "./pages/restaurant/restaurant_show_menu_page";
import HomePage from "src/pages/home_page";
import useLocalStorage from "./hooks/useLocalStorage";
import { setCustomerPhoneNumber } from "./redux/navSlice";

function App() {
  const dispatch = useDispatch();
  const [customerPhoneNumberLocal] = useLocalStorage("customerPhoneNumber", "");

  useEffect(() => {
    dispatch(setCustomerPhoneNumber(customerPhoneNumberLocal));
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="restaurant">
          <Route
            path="order/:userName/:tableNumber"
            element={<RestaurantOrderMenuPage />}
          />
          <Route path="show/:userName" element={<RestaurantShowMenuPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        transition={Flip}
        autoClose={1200}
        limit={4}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;

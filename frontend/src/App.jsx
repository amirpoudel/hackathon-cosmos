import React from "react";
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

import HomePage from "src/pages/home_page";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          path="/restaurant/:userName/:tableNumber"
          element={<HomePage />}
        />
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

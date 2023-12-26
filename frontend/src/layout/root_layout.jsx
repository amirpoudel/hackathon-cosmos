import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./nav_bar/nav_bar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

import { fetchOrderStatusAsync } from "src/redux/navSlice";

function NavBar() {
  const dispatch = useDispatch();
  const orderedStatus = useSelector((state) => state.nav.orderedStatus);

  useEffect(() => {
    dispatch(fetchOrderStatusAsync());
    if (orderedStatus) {
      const intervalId = setInterval(() => {
        console.log("calling order status");
        dispatch(fetchOrderStatusAsync());
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, orderedStatus]);

  return (
    <nav>
      <Box>
        <Box
          sx={{
            mt: "1rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Restaurant Menu
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "0.2rem",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box className="underline" style={{ width: "4rem" }}></Box>
            <Box className="underline" style={{ width: "3rem" }}></Box>
            <Box className="underline" style={{ width: "2rem" }}></Box>
          </Box>
        </Box>
        {orderedStatus && (
          <Typography sx={{ variant: "body1" }}>
            Ordered Status : {orderedStatus}
          </Typography>
        )}
      </Box>
    </nav>
  );
}

export default NavBar;

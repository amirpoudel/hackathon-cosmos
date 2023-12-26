import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

function NavBar() {
  const dispatch = useDispatch();
  const orderedStatus = useSelector((state) => state.home.orderedStatus);

  useEffect(() => {
    if (orderedStatus) {
      dispatch(fetchOrderListAsync());
      const intervalId = setInterval(() => {
        dispatch(fetchOrderListAsync());
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

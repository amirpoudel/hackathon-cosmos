import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
function ShowLoaderError({ isLoading, dataList }) {
  const showLoading = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "25vh",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
  const showError = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "25vh",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="h4">Unable to load</Typography>
      <p>No Restaurant Found</p>
    </Box>
  );

  return (
    <>
      {isLoading && showLoading}
      {dataList.length === 0 && showError}
    </>
  );
}

export default ShowLoaderError;

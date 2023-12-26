import React from "react";
import { Typography, Box } from "@mui/material";
function NavBar() {
  return (
    <nav>
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
    </nav>
  );
}

export default NavBar;

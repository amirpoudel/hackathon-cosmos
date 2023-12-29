import React from "react";
import { TextField, Box } from "@mui/material";

function SearchBarStandard({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TextField
          id="standard-basic"
          label="Search Restaurant"
          variant="standard"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
    </div>
  );
}

export default SearchBarStandard;

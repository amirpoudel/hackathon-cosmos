import React from "react";
import { Box, Container } from "@mui/material";

import FirstSectionCategories from "./component/first_section_home";

function HomeView() {
  return (
    <main>
      <Box component="section">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: { xs: 2, md: 4, lg: 6 },
          }}
          disableGutters
        >
          <FirstSectionCategories />
        </Container>
      </Box>
    </main>
  );
}

export default HomeView;

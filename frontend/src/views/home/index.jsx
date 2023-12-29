import React from "react";

import { Box, Container } from "@mui/material";

import FirstSectionRestaurantMenu from "./component/first_section_restaurant_menu";

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
          <FirstSectionRestaurantMenu />
        </Container>
      </Box>
    </main>
  );
}

export default HomeView;

import React, { useState } from "react";
import { Box, Container } from "@mui/material";

import FirstSectionCategories from "./component/first_section_home";
import SecondSectionFoodList from "./component/second_section_food_list";

function HomeView() {
  const [selectedCategoryFoodList, setSelectedCategoryFoodList] = useState([]);

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
          <FirstSectionCategories
            setSelectedCategoryFoodList={setSelectedCategoryFoodList}
          />
          <SecondSectionFoodList
            selectedCategoryFoodList={selectedCategoryFoodList}
          />
        </Container>
      </Box>
    </main>
  );
}

export default HomeView;

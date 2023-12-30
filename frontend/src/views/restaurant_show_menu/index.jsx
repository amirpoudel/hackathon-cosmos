import React, { useState } from "react";
import { Box, Container, Slide } from "@mui/material";

import FirstSectionCategories from "./component/first_section_categories";
import SecondSectionFoodList from "./component/second_section_food_list";

function RestaurantShowMenuView() {
  const [selectedCategoryFoodList, setSelectedCategoryFoodList] = useState([]);

  return (
    <Box component="main">
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
          <Box sx={{ mt: "4rem" }}>
            <SecondSectionFoodList
              selectedCategoryFoodList={selectedCategoryFoodList}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default RestaurantShowMenuView;

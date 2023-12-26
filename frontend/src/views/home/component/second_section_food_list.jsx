import React from "react";
import { Grid } from "@mui/material";

import FoodCard from "src/component/cards/food_card";

function SecondSectionFoodList({ selectedCategoryFoodList }) {
  return (
    <div>
      <Grid container>
        {selectedCategoryFoodList.map((foodItem, index) => (
          <Grid
            item
            key={foodItem._id}
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 1.5,
            }}
          >
            <FoodCard
              imagePreview={foodItem?.imageLink || ""}
              description={foodItem?.description || ""}
              price={foodItem?.price || ""}
              foodName={foodItem?.name || ""}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SecondSectionFoodList;

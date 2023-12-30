import React from "react";
import { Grid, Typography, Box } from "@mui/material";

import FoodCardShow from "src/component/cards/food_card_show";

function SecondSectionFoodList({
  selectedCategoryFoodList,
  checkedItems,
  setCheckedItems,
}) {
  console.log(selectedCategoryFoodList);

  if (selectedCategoryFoodList?.length === 0) {
    return (
      <Box>
        <Typography variant="h4">No Item Found</Typography>
      </Box>
    );
  }

  console.log("selected category food list", selectedCategoryFoodList);

  return (
    <div>
      <Grid container>
        {selectedCategoryFoodList?.map((foodItem, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 1.5,
            }}
          >
            <FoodCardShow
              itemId={foodItem?._id}
              imagePreview={foodItem?.imageLink || ""}
              description={foodItem?.description || ""}
              price={foodItem?.price || ""}
              foodName={foodItem?.name || ""}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SecondSectionFoodList;

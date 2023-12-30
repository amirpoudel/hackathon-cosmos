import React from "react";

import { Grid, Box } from "@mui/material";

import RestaurantCard from "src/component/cards/restaurant_card";
import ShowLoaderError from "src/component/show_loader_error/show_loader_error";

function RenderRestaurantList({
  restaurantList,
  isRestaurantLoading,
  goToShowRestaurantMenuPage,
}) {
  return (
    <Box>
      <ShowLoaderError
        isLoading={isRestaurantLoading}
        dataList={restaurantList}
      />
      <Grid container spacing={2}>
        {restaurantList?.map((restaurant) => (
          <Grid item key={restaurant._id}>
            <RestaurantCard
              restaurant={restaurant}
              goToShowRestaurantMenuPage={goToShowRestaurantMenuPage}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RenderRestaurantList;

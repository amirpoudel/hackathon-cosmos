import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { fetchRestaurantListAsync } from "src/redux/homeSlice";

import SearchBarStandard from "src/component/search_bar/search_bar_standard";
import RenderRestaurantList from "./render_restaurant_list";
import useDebounce from "src/hooks/useDebounce";

function FirstSectionRestaurantMenu() {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const isRestaurantLoading = useSelector(
    (state) => state.home.isRestaurantLoading
  );
  const restaurantList = useSelector((state) => state.home.restaurantList);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(fetchRestaurantListAsync({ searchQuery: debouncedSearchQuery }));
  }, [debouncedSearchQuery]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SearchBarStandard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <RenderRestaurantList
        restaurantList={restaurantList}
        isRestaurantLoading={isRestaurantLoading}
      />
    </Box>
  );
}

export default FirstSectionRestaurantMenu;

import { useState, useMemo, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { fetchFoodList, setFilterFoodList } from "src/redux/homeSlice";

function FirstSectionCategories() {
  const dispatch = useDispatch();

  const { userName } = useParams();
  const { tableNumber } = useParams();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryList = useSelector((state) => state.home.categoryList);

  // Filter out the FirstSectionCategories from the food list
  const filteredCategoryList = useMemo(() => {
    return [
      "All",
      ...new Set(categoryList.map((item) => item.menuCategory.name)),
    ];
  }, [foodList]);

  useEffect(() => {
    dispatch(fetchFoodList({ userName, tableNumber }));
  }, [dispatch]);

  function handleCategoryChange(item) {
    setSelectedCategory(item);
    dispatch(setFilterFoodList(item));
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>
      {filteredCategoryList.map((item, index) => {
        return (
          <Button
            key={index}
            variant="text"
            onClick={() => handleCategoryChange(item)}
            sx={{ textTransform: "capitalize", padding: "0", color: "black" }}
            size="small"
            className={selectedCategory === item ? "underline" : ""}
          >
            {item}
          </Button>
        );
      })}
    </Box>
  );
}

export default FirstSectionCategories;

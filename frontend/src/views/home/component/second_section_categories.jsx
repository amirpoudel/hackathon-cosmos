import { useState, useMemo } from "react";
import { Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { setFilterFoodList } from "src/redux/homeSlice";

function SecondSectionCategories() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const foodList = useSelector((state) => state.home.foodList);

  // Filter out the SecondSectionCategories from the food list
  const categoryList = useMemo(() => {
    return ["All", ...new Set(foodList.map((item) => item.menuCategory.name))];
  }, [foodList]);

  function handleCategoryChange(item) {
    setSelectedCategory(item);
    dispatch(setFilterFoodList(item));
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>
      {categoryList.map((item, index) => {
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

export default SecondSectionCategories;

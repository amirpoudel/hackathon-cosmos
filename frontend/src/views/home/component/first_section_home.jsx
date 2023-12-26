import { useState, useMemo, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { fetchCategoryList, setFilterFoodList } from "src/redux/homeSlice";

function FirstSectionCategories() {
  const dispatch = useDispatch();

  const { userName } = useParams();
  const { tableNumber } = useParams();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryList = useSelector((state) => state.home.categoryList);

  console.log(categoryList);

  // Filter out the FirstSectionCategories from the food list
  // const filteredCategoryList = useMemo(() => {
  //   return [
  //     "All",
  //     ...new Set(categoryList.map((item) => item.menuCategory.name)),
  //   ];
  // }, [categoryList]);

  // useEffect(() => {
  //   dispatch(fetchCategoryList({ userName, tableNumber }));
  // }, [dispatch]);

  function handleCategoryChange(item) {
    setSelectedCategory(item?.name);
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>
      {categoryList.map((item) => {
        return (
          <Button
            key={item?._id}
            variant="text"
            onClick={() => handleCategoryChange(item)}
            sx={{ textTransform: "capitalize", padding: "0", color: "black" }}
            size="small"
            className={selectedCategory === item?.name ? "underline" : ""}
          >
            {item?.name}
          </Button>
        );
      })}
    </Box>
  );
}

export default FirstSectionCategories;

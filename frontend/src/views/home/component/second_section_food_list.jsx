import React from "react";

function SecondSectionFoodList({ selectedCategoryFoodList }) {
  return (
    <div>
      {selectedCategoryFoodList.map((fooditem, index) => (
        <div key={index}>hwllo</div>
      ))}
    </div>
  );
}

export default SecondSectionFoodList;

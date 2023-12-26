import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchFoodItemListAsync } from 'src/redux/menuSlice';

import FoodCard from 'src/components/cards/food_card';

function ItemList({ selectedCategoryId }) {
  const dispatch = useDispatch();

  const foodItemList = useSelector((state) => state.menu.foodItemList);

  useEffect(() => {
    dispatch(fetchFoodItemListAsync({ categoryId: selectedCategoryId }));
  }, [dispatch, selectedCategoryId]);

  const handleDeleteItem = (itemId) => {
    console.log('delete item id', itemId);
  };
  const handleEditItem = (itemId) => {
    console.log('edit item id', itemId);
  };

  return (
    <Box sx={{ height: '35rem', flexGrow: '1' }}>
      <Grid container sx={{ mt: 4 }} justifyContent="flex-start" alignContent="flex-start">
        {foodItemList.map((foodItem, index) => (
          <Grid
            item
            key={foodItem._id}
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1.5 }}
          >
            <FoodCard
              imagePreview={foodItem?.imageLink || ''}
              description={foodItem?.description || ''}
              price={foodItem?.price || ''}
              foodName={foodItem?.name || ''}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <IconButton onClick={() => handleDeleteItem(foodItem?._id)}>
                <DeleteIcon sx={{ width: '1rem', height: '1rem' }} />
              </IconButton>
              <IconButton onClick={() => handleEditItem(foodItem?._id)}>
                <EditIcon sx={{ width: '1rem', height: '1rem' }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ItemList;

ItemList.propTypes = {
  selectedCategoryId: PropTypes.any,
};

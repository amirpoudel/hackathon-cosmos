import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import FoodCard from 'src/components/cards/food_card';

function ItemList() {
  const foodItemList = useSelector((state) => state.menu.foodItemList);

  return (
    <Box sx={{ height: '35rem', border: '1px solid red', flexGrow: '1' }}>
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
              <IconButton>
                <DeleteIcon sx={{ width: '1rem', height: '1rem' }} />
              </IconButton>
              <IconButton>
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

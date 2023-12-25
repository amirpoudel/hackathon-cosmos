import React from 'react';

import { Container } from '@mui/material';

import AddCategory from './components/add-category';
import AddFoodItem from './components/add-food-item';

function MenuView() {
  return (
    <Container sx={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.2rem' }}>
      <AddCategory />
      <AddFoodItem />
    </Container>
  );
}

export default MenuView;

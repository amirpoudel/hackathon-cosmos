import React from 'react';

import { Box } from '@mui/material';

import CategoryList from './component/category_list';
import ItemList from './component/item_list';

function ItemListView() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CategoryList />
      <ItemList />
    </Box>
  );
}

export default ItemListView;

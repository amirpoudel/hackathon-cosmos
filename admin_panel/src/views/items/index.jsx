import React, { useState } from 'react';

import { Box } from '@mui/material';

import CategoryList from './component/category_list';
import ItemList from './component/item_list';

function ItemListView() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <CategoryList
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <ItemList selectedCategoryId={selectedCategoryId} />
    </Box>
  );
}

export default ItemListView;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { fetchCategoryListAsync } from 'src/redux/menuSlice';

import CategoryItem from './category_item';

function CategoryList({ selectedCategoryId, setSelectedCategoryId }) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.menu.categoryList);

  useEffect(() => {
    dispatch(fetchCategoryListAsync());
  }, [dispatch]);

  const [selectedCategoryName, setSelectedCategoryName] = useState('all');

  function filterCategoryItem(id, name) {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  }

  return (
    <Box
      sx={{
        height: '35rem',
        minWidth: '18rem',
        backgroundColor: 'white',
        p: 2,
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem' }}
      >
        Cateogory List
      </Typography>
      <Box sx={{ my: '1rem', overflow: 'auto' }}>
        {categoryList.map((category, index) => (
          <Card
            key={category._id}
            sx={{
              backgroundColor: selectedCategoryName === category?.name ? '#F3F6F4' : 'white',

              position: 'relative',
              height: '4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => filterCategoryItem(category?._id, category?.name)}
          >
            <CategoryItem name={category?.name} id={category?._id} />

            {selectedCategoryId === category._id && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton>
                  <DeleteIcon sx={{ width: '1rem', height: '1rem' }} />
                </IconButton>
                <IconButton>
                  <EditIcon sx={{ width: '1rem', height: '1rem' }} />
                </IconButton>
              </Box>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CategoryList;

CategoryList.propTypes = {
  selectedCategoryId: PropTypes.any,
  setSelectedCategoryId: PropTypes.func,
};

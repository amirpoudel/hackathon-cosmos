import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNewCategoryAsync } from 'src/redux/menuSlice';

function AddCategory() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const data = {
      category,
      categoryDescription: '',
    };
    dispatch(addNewCategoryAsync(data)).then((res) => {
      if (addNewCategoryAsync.fulfilled.match(res)) {
        setCategory('');
      }
    });
  };
  return (
    <Box>
      <form onSubmit={handleCategorySubmit} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '5%',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            size="small"
            sx={{ flexGrow: '1' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            className="button__color--orange"
            sx={{
              padding: { xs: '0.5rem', sm: '0.5rem' },
              fontSize: { xs: '0.85rem', sm: '1rem' },
            }}
          >
            Add Category
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddCategory;

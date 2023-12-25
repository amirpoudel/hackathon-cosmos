import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@mui/material';

function CategoryItem({ name, id }) {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
        {name || ''}
      </Typography>
    </Box>
  );
}

export default CategoryItem;
CategoryItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};

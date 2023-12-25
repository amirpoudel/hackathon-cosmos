import React from 'react';

import PropTypes from 'prop-types'; // Import PropTypes

import { Card, Typography, CardMedia, Box } from '@mui/material';

function FoodCard({ imagePreview, description, price, foodName }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        borderRadius: '1.3rem',
        boxShadow: ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        border: '1px solid #e0e0e0',
      }}
    >
      <CardMedia
        component="img"
        sx={{
          position: 'absolute',
          left: '1rem',
          top: '-30%',
          width: '6rem',
          height: '80%',
          maxHeight: '6rem',
          boxShadow: '0px 4px 10px 2px rgba(94, 74, 74, 0.25)',
          borderRadius: '1.3rem',
          objectFit: 'cover',
        }}
        image={imagePreview}
        title={foodName}
      />
      <Box sx={{ padding: '0.8rem' }}>
        <Box>
          <Typography variant="body1" sx={{ textAlign: 'right', fontWeight: '700' }}>
            {foodName || 'item name'}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'right', fontWeight: '500', color: 'orange' }}
          >
            Rs. {price || '0'}
          </Typography>
        </Box>
        <Box sx={{ mt: '0.8rem' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#504a49',
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description || ''}
          </Typography>
        </Box>{' '}
      </Box>

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
FoodCard.propTypes = {
  foodName: PropTypes.string, // Example validation for foodName
  price: PropTypes.number, // Example validation for price
  description: PropTypes.string, // Example validation for description
  imagePreview: PropTypes.string, // Example validation for imagePreview
};

export default FoodCard;

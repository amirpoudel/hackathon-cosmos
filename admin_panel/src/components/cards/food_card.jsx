import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  CardMedia,
  Box,
  CardActions,
  IconButton,
  styled,
  Collapse,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function FoodCard({ imagePreview, description, price, foodName }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        m: 1,
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
            {description?.slice(0, 100) || ''}
          </Typography>
        </Box>{' '}
      </Box>

      <CardActions disableSpacing sx={{ padding: '0' }}>
        <ExpandMore
          expand={expanded ? 'true' : 'false'}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ padding: '0' }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default FoodCard;

FoodCard.propTypes = {
  foodName: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  imagePreview: PropTypes.string,
};

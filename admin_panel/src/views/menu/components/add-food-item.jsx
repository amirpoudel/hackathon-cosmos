import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import FoodCard from '../../../components/cards/food_card';

import { addNewFoodItem, fetchCategoryListAsync } from '../../../redux/menuSlice';

function AddFoodItem() {
  const dispatch = useDispatch();
  const [foodName, setFoodName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const isCategoryListLoading = useSelector((state) => state.menu.isCategoryListLoading);
  const categoryListError = useSelector((state) => state.menu.categoryListError);
  const categoryList = useSelector((state) => state.menu.categoryList);
  useEffect(() => {
    dispatch(fetchCategoryListAsync());
  }, [dispatch]);

  const handleAddFood = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('categoryId', selectedCategory);
    formData.append('price', price);
    formData.append('itemImage', image);
    formData.append('description', description);
    formData.append('discountPercentage', discountPercentage);

    dispatch(addNewFoodItem(formData));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Box
      sx={{
        border: '1px solid #e8e8e8',
        borderRadius: '0.5rem',
        padding: '1rem',
        mt: '2rem',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add Food Item
      </Typography>
      <Divider />
      <br />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '55%' },
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            padding: '1rem',
          }}
        >
          <form onSubmit={handleAddFood}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                {' '}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Food Name
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Food Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Category
                </Typography>
                <FormControl fullWidth size="small" required>
                  <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {renderMenuItem(isCategoryListLoading, categoryListError, categoryList)}
                  </Select>
                </FormControl>{' '}
              </Grid>
              <Grid item xs={12} md={6}>
                {' '}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Price
                </Typography>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {' '}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Discount (in %)
                </Typography>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {' '}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Upload Image
                </Typography>
                <TextField
                  type="file"
                  id="outlined-basic"
                  label="Image"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={handleImageChange}
                />
              </Grid>
              <Grid item xs={12}>
                {' '}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
                  Description
                </Typography>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" sx={{ ml: 'auto' }} className="button__color--orange">
                  Add Item
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {/* Image Preview */}
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            padding: '1rem',
          }}
        >
          <Box sx={{ mt: '2rem' }}>
            <FoodCard
              foodName={foodName}
              price={price}
              description={description}
              imagePreview={imagePreview}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddFoodItem;

const renderMenuItem = (isCategoryListLoading, categoryListError, categoryList) => {
  if (isCategoryListLoading) return <MenuItem value="">Loading..</MenuItem>;
  if (categoryListError) return <MenuItem value="">{categoryListError}</MenuItem>;
  return categoryList.map((category, index) => (
    <MenuItem key={index} value={category._id}>
      {category.name}
    </MenuItem>
  ));
};

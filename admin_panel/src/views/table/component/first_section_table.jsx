import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Stack,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { addTableAsync } from 'src/redux/tableSlice';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function FirstSectionTable() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTable = () => {
    const data = {
      tableNumber,
      capacity,
    };

    dispatch(addTableAsync(data)).then((res) => {
      if (addTableAsync.fulfilled.match(res)) {
        setTableNumber('');
        setCapacity('');
        setOpen(false);
      }
    });
  };
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Table List</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Create New
        </Button>
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create Table</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Table Number"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ my: '0.5rem' }}
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />

          <TextField
            type="number"
            label="Table Capacity"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ my: '0.5rem' }}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTable}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FirstSectionTable;

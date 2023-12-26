import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import Iconify from 'src/components/iconify';
import { deleteTableByAsyncById } from 'src/redux/tableSlice';

import QRCodeToPDF from './qr_to_pdf_popup';

// ----------------------------------------------------------------------

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedQrLink,
  selectedId,
}) {
  const dispatch = useDispatch();
  const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);

  const handleTableDelete = () => {
    dispatch(deleteTableByAsyncById({ tableId: selectedId }));
  };

  const handleOpenQrDialog = () => {
    setOpenQrCodeDialog(true);
  };

  const handleCloseQrDialog = () => {
    setOpenQrCodeDialog(false);
  };

  return (
    <Box>
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )}

        {numSelected ? (
          <Box>
            {/* <Box sx={{ visibility: 'hidden' }}> */}

            {/* </Box> */}
            <Tooltip title="Generate QR">
              <IconButton onClick={handleOpenQrDialog}>
                <QrCode2Icon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleTableDelete}>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Dialog
        open={openQrCodeDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseQrDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>QR for Table {selectedId}</DialogTitle>
        <DialogContent>
          <QRCodeToPDF selectedQrLink={selectedQrLink} selectedId={selectedId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQrDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedQrLink: PropTypes.any,
  selectedId: PropTypes.any,
};

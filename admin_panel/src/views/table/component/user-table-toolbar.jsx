import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QRcode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedQrLink,
}) {
  const dispatch = useDispatch();
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      generateQRCode();
    }
  }, [selectedQrLink]);

  const generateQRCode = async () => {
    console.log(qrCodeRef);
    const canvas = await html2canvas(qrCodeRef.current);
    const qrCodeDataURL = canvas.toDataURL('image/png');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataURL);
    const { width, height } = qrCodeImage.scale(1);

    page.drawImage(qrCodeImage, {
      x: 50,
      y: 500,
      width,
      height,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'qrcode.pdf';
    link.click();
  };
  const handleTableDelete = () => {
    dispatch();
  };

  return (
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
          <QRcode ref={qrCodeRef} value={selectedQrLink} size={20} />
          {/* </Box> */}
          <Tooltip title="Generate QR">
            <IconButton onClick={generateQRCode}>
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
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedQrLink: PropTypes.any,
};

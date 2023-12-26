import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import QRcode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@mui/material';

const QRCodeToPDF = ({ selectedQrLink, selectedId }) => {
  const qrCodeRef = useRef(null);

  const downloadPDF = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const qrCodeDataURL = canvas.toDataURL('image/png');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataURL);

    // Add a table ID to the PDF at the top
    const tableIdText = `Table No : ${selectedId}`; // Replace "YourTableID" with the actual table ID
    page.drawText(tableIdText, { x: 50, y: page.getHeight() - 80, fontSize: 12 });

    page.drawImage(qrCodeImage, {
      x: 150,
      y: 400,
      width: 300,
      height: 300,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'qrcode.pdf';
    link.click();
  };
  return (
    <div>
      <div ref={qrCodeRef}>
        <QRcode value={selectedQrLink} />
      </div>
      <br />
      <br />
      <Button onClick={downloadPDF} sx={{ backgroundColor: 'black', color: 'white' }} fullWidth>
        Download
      </Button>
    </div>
  );
};

export default QRCodeToPDF;

QRCodeToPDF.propTypes = {
  selectedQrLink: PropTypes.string,
  selectedId: PropTypes.string,
};

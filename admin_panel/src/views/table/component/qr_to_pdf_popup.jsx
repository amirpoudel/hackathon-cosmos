import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import QRcode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@mui/material';

const QRCodeToPDF = ({ selectedQrLink }) => {
  const qrCodeRef = useRef(null);

  const downloadPDF = async () => {
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

  return (
    <div ref={qrCodeRef}>
      <QRcode value={selectedQrLink} />
      <Button onClick={downloadPDF}>download</Button>
    </div>
  );
};

export default QRCodeToPDF;

QRCodeToPDF.propTypes = {
  selectedQrLink: PropTypes.string,
};

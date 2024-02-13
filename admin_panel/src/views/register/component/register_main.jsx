import React from 'react';
import { Box } from '@mui/material';

import RegisterForm from './register_form';

function RegisterMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <RegisterForm />
    </Box>
  );
}

export default RegisterMain;

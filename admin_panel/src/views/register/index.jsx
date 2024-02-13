import React from 'react';
import { Box, Container } from '@mui/material';

import RegisterMain from './component/register_main';

function RegisterView() {
  return (
    <main style={{ height: '100vh' }}>
      <Box variant="section" sx={{ height: '100%' }}>
        <Container
          sx={{
            maxWidth: 'xl',
            padding: { xs: 2, md: 4, lg: 6 },
            height: '100%',
          }}
        >
          <RegisterMain />
        </Container>
      </Box>
    </main>
  );
}

export default RegisterView;

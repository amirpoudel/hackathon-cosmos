import React from 'react';
import { Box, Container } from '@mui/material';

import LoginMain from './component/login_main';

function LoginView() {
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
          <LoginMain />
        </Container>
      </Box>
    </main>
  );
}

export default LoginView;

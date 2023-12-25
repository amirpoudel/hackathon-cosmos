import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  useScrollToTop();

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>
          <Suspense>
            <Outlet />
          </Suspense>
        </Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

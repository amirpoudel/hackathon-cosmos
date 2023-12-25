import React from 'react';
import { Helmet } from 'react-helmet-async';

import MenuView from '../views/menu';

function MenuPage() {
  return (
    <>
      <Helmet>
        <title>Make Menu</title>
      </Helmet>
      <MenuView />
    </>
  );
}

export default MenuPage;

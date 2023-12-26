import React from 'react';
import { Helmet } from 'react-helmet-async';

import ItemListView from 'src/views/items';

function ItemPage() {
  return (
    <>
      <Helmet>
        <title> Item | QR Food  </title>
      </Helmet>

      <ItemListView />
    </>
  );
}

export default ItemPage;

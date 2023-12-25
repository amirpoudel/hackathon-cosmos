import React from 'react';
import { Helmet } from 'react-helmet-async';

import ItemListView from 'src/views/items';

function ItemPage() {
  return (
    <>
      <Helmet>
        <title> Item | Minimal UI </title>
      </Helmet>

      <ItemListView />
    </>
  );
}

export default ItemPage;

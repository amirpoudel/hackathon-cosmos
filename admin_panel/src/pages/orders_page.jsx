import React from 'react';
import { Helmet } from 'react-helmet-async';

import OrderView from 'src/views/order';

function OrdersPage() {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <OrderView />
    </>
  );
}

export default OrdersPage;

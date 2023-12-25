import React from 'react';
import { Helmet } from 'react-helmet-async';

import TableView from 'src/views/table';

function TablePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <TableView />
    </>
  );
}

export default TablePage;

import React from 'react';

import { Container } from '@mui/material';
import FirstSectionTable from './component/first_section_table';
import SecondSectionTableList from './component/second_section_table_list';

function TableView() {
  return (
    <Container>
      <FirstSectionTable />
      <SecondSectionTableList />
    </Container>
  );
}

export default TableView;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/components/table/table-no-data';
import UserTableHead from 'src/components/table/user-table-head';
import TableEmptyRows from 'src/components/table/table-empty-rows';

import { fetchTableListAsync } from 'src/redux/tableSlice';

import { emptyRows, applyFilter, getComparator } from 'src/components/table/utils';

// import { BASE_URL } from 'src/config/base_url';

import UserTableRow from './user-table-row';
import UserTableToolbar from './user-table-toolbar';

// ----------------------------------------------------------------------

const tableHeadLabel = [
  { id: 'tableNumber', label: 'Table Number' },
  { id: 'orderCount', label: 'Total Order ' },
  { id: 'paidAmount', label: 'Paid Amount' },
  { id: 'unpaidAmount', label: 'Unpaid Amount' },
  { id: 'totalAmount', label: 'Total Amount' },
];

export default function SecondTableList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const [selectedId, setSelectedId] = useState(null);

  const [selectedQrLink, setSelectedQrLink] = useState('');

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableList = useSelector((state) => state.table.tableList);

  useEffect(() => {
    dispatch(fetchTableListAsync());
  }, [dispatch]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name, tableNumber) => {
    if (selectedId === null) {
      setSelectedId(tableNumber);
      setSelectedQrLink(`http://127.0.0.1:5173/restaurant/${name}/${tableNumber}`);
    } else {
      setSelectedId(null);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: tableList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Card>
        <UserTableToolbar
          numSelected={selectedId}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selectedQrLink={selectedQrLink}
          selectedId={selectedId}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={tableList.length}
                numSelected={selectedId}
                onRequestSort={handleSort}
                headLabel={tableHeadLabel}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      tableNumber={row.tableNumber}
                      orderCount={row.totalOrder}
                      paidAmount={row.paidAmount}
                      unpaidAmount={row.unpaidAmount}
                      totalAmount={row.totalAmount}
                      selectedId={selectedId}
                      handleClick={(event) =>
                        handleClick(event, row?.restaurantUsername, row?.tableNumber)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, tableList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={tableList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

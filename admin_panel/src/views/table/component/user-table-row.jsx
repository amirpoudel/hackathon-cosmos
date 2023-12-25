import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selectedId,
  tableNumber,
  orderCount,
  paidAmount,
  unpaidAmount,
  totalAmount,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" onClick={handleClick}>
      <TableCell>{tableNumber}</TableCell>

      <TableCell>{orderCount}</TableCell>

      <TableCell>{paidAmount}</TableCell>
      <TableCell>{unpaidAmount}</TableCell>
      <TableCell>{totalAmount}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  tableNumber: PropTypes.any,
  orderCount: PropTypes.any,
  handleClick: PropTypes.func,
  paidAmount: PropTypes.any,
  unpaidAmount: PropTypes.any,
  totalAmount: PropTypes.any,
  selectedId: PropTypes.any,
};

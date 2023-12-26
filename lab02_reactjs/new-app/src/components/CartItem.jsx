// CartItem.js
import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';

const CartItem = ({ product, onIncrease, onDecrease }) => {
  const { name, price, quantity, total } = product;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <Button onClick={onDecrease}>-</Button>
        {quantity}
        <Button onClick={onIncrease}>+</Button>
      </TableCell>
      <TableCell>{total}</TableCell>
    </TableRow>
  );
};

export default CartItem;

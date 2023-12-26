// Cart.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CartItem from './CartItem';

const Cart = ({ products }) => {
    const [cart, setCart] = useState(products.map((product) => ({ ...product, quantity: 0, total: 0 })));

    const handleIncrease = (productId) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1, total: (product.quantity + 1) * product.price }
                    : product
            )
        );
    };

    const handleDecrease = (productId) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === productId && product.quantity > 0
                    ? { ...product, quantity: product.quantity - 1, total: (product.quantity - 1) * product.price }
                    : product
            )
        );
    };

    const handleDelete = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.total, 0);
    };

    return (
        <TableContainer component={Paper} style={{ margin: '20px auto', maxWidth: '600px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Назва товару</TableCell>
                        <TableCell>Ціна</TableCell>
                        <TableCell>Кількість</TableCell>
                        <TableCell>Сума</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((product) => (
                        <CartItem
                            key={product.id}
                            product={product}
                            onIncrease={() => handleIncrease(product.id)}
                            onDecrease={() => handleDecrease(product.id)}
                            onDelete={() => handleDelete(product.id)}
                        />
                    ))}
                </TableBody>
            </Table>
            <div style={{ textAlign: 'right', padding: '10px' }}>
                Загальна сума: {calculateTotal()}
            </div>
        </TableContainer>
    );
};

export default Cart;

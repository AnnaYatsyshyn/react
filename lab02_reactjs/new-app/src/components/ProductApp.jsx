// ProductApp.js
import React, { useState } from 'react';
import { Button, Typography, Paper, TextField, List, ListItem} from '@mui/material'

const ProductApp = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name.trim() === '') {
            alert('Введіть назву товару');
            return;
        }

        const newProduct = { id: Date.now(), name };
        setProducts((prevProducts) => [...prevProducts, newProduct]);

        setName('');
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDelete = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Product App
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Назва товару"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    style={{ marginBottom: '10px' }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Додати до списку
                </Button>
            </form>
            <Typography variant="h5" style={{ marginTop: '20px' }}>
                Список товарів:
            </Typography>
            <List>
                {products.map((product) => (
                    <ListItem
                        key={product.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div> {product.name} </div>
                        <Button variant="outlined" color="secondary" onClick={() => handleDelete(product.id)}>
                            Видалити
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ProductApp;

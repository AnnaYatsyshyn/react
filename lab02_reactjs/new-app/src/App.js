import React from 'react';
import {Typography, Container } from '@mui/material';
import MyCounter from './components/MyCounter';
import ProductApp from "./components/ProductApp";
import Cart from "./components/Cart";
import GuessGame from "./components/GuessGame";

const counters = [
    { id: 1, initial: 6, min: -5, max: 10 },
    { id: 2, initial: 5 },
    { id: 3 },
];

const products = [
    { id: 1, name: 'Product 1', price: 176 },
    { id: 2, name: 'Product 2', price: 185 },
    { id: 3, name: 'Product 3', price: 488 },

    // і так далі
];

function App() {
    return (
        <Container>
            <Typography variant="h1" component="div" gutterBottom>
                Welcome to My App
            </Typography>
            <Typography variant="subtitle1" component="div" gutterBottom>
                This is a simple React app using Material-UI for design.
            </Typography>

            <Typography variant="h3" component="div" gutterBottom>
                Task 1.1
            </Typography>
            <div>
                <MyCounter />
            </div>
            <Typography variant="h3" component="div" gutterBottom>
                Task 1.2
            </Typography>
            {/* Mapping through the counters array and rendering MyCounter for each object */}
            {counters.map((counter) => (
                <MyCounter
                    key={counter.id}
                    initialValue={counter.initial}
                    minValue={counter.min}
                    maxValue={counter.max}
                />
            ))}
            <Typography variant="h3" component="div" gutterBottom>
                Task 2.1-2.2
            </Typography>
            <div>
                <ProductApp/>
            </div>
            <Typography variant="h3" component="div" gutterBottom>
                Task 3
            </Typography>
            <div>
                {/* Переконайтеся, що products визначений перед передачею у Cart */}
                 <Cart products={products} />
            </div>
            <Typography variant="h3" component="div" gutterBottom>
                Task 4
            </Typography>
            <div>
                <GuessGame />
            </div>
        </Container>
    );
}

export default App;

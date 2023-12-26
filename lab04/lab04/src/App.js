import React from "react";
import ProductsContextProvider from "./context/products-context";
import ProductApp from "./Components/ProductApp";
import "./Components/styles.css"; // Додайте цей рядок

function App() {
    return (
        <div className="App">
            <ProductsContextProvider>
                <div className="container">
                    <ProductApp />
                </div>
            </ProductsContextProvider>
        </div>
    );
}

export default App;

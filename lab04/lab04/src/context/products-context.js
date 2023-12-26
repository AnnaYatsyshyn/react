import React, { createContext, useReducer, useEffect } from "react";
import { productsReducer } from "../reducers/products";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [products, dispatch] = useReducer(productsReducer, [], (initial) => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : initial;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
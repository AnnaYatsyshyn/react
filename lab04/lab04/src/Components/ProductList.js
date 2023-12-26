import { useContext } from "react";
import Product from "./Product";
import { ProductsContext } from "../context/products-context";

const ProductList = () =>
{ 
    const { products } = useContext(ProductsContext);
    return(
        <div>
        {products.map((product) => (
        <Product key={product.id} id={product.id} name={product.name} />
      ))}
      </div>
      )
}

export default  ProductList

import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const ProductApp = () => {
  return (
    <div className="product-list">
      <ProductForm></ProductForm>
      <ProductList></ProductList>
    </div>
  );
};

export default ProductApp;
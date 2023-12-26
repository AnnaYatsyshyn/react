import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/products-context";
import { Button, Typography, Paper, TextField, List, ListItem} from '@mui/material'

const ProductForm = () =>
{

    const { dispatch } = useContext(ProductsContext);
    const [productName, setProductName] = useState("");
  
    const handleAddProduct = () => {
      if (productName.trim() !== "") {
        dispatch({ type: "ADD_PRODUCT", name: productName });
        setProductName("");
      }
    };
  
    return(
        <form>
            <TextField
                label="Назва товару"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
                Додати до списку
            </Button>
        </form>

    )
}

export default ProductForm
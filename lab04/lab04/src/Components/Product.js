import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../context/products-context";
import { Button, Typography, Paper, TextField, List, ListItem} from '@mui/material'


const Product = ({ id, name }) => {
  const {dispatch} = useContext(ProductsContext);

  const handleDelete = () => {
    dispatch({type: "REMOVE_PRODUCT", id: id});
  };

  const handleEdit = () => {
    const newName = prompt("Введіть нову назву товару", name);
    if (newName) {
      dispatch({type: "EDIT_PRODUCT", payload: {id, newName}});
    }
  };

  useEffect(() => {
    console.log(`Елемент з ID: ${id}, Назва: "${name}" було додано.`);
    return () => {
      console.log(`Елемент з ID: ${id}, Назва: "${name}" було видалено.`);
    };
  }, [id, name]);

  return (
      <List>
        <ListItem
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
          <div>{name}</div>
          <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
                style={{marginRight: '10px'}}
            >
              Видалити
            </Button>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Редагувати
            </Button>
          </div>
        </ListItem>
      </List>
  );
};

export default Product;

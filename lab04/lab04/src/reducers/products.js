export const productsReducer = (state, action) => {
    switch (action.type) {
      case "POPULATE_PRODUCTS":
        return action.products;
      case "ADD_PRODUCT":
        const newProduct = {
          id: Date.now(),
          name: action.name,
        };
        return [...state, newProduct];
      case "REMOVE_PRODUCT":
        return state.filter((product) => product.id !== action.id);
      case "EDIT_PRODUCT":
        return state.map((product) =>
          product.id === action.payload.id
            ? { ...product, name: action.payload.newName }
            : product
        );
      default:
        return state;
    }
  };
  
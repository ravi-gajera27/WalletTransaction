// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: 'ADDITEM',
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: 'DELITEM',
    payload: product,
  };
};

// Set Metamask Address
export const setWalletAddress = (address) => {
  return {
    type: 'SETADDRESS',
    payload: address,
  };
};

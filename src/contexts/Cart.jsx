import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  // check if item is already in the list.
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  // if it does, increase quantity by 1,
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  // return the array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems, productToDecrease) => {
  return cartItems.map((item) =>
    item.id === productToDecrease.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  addItemToCart: () => {},
  cartCount: 0,
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'setIsCartOpen',
  SET_CART_ITEMS: 'setCartItems',
  SET_CART_COUNT: 'setCartCount',
  SET_CART_TOTAL: 'setCartTotal',
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

const handleReduce = (state, payload) => {
  return { ...state, ...payload };
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const isActionCorrect = Object.values(CART_ACTION_TYPES).includes(type);
  if (!isActionCorrect)
    throw new Error(`Unhandled type ${type} in userReducer`);
  return handleReduce(state, payload);
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload });
  };

  const addItemToCart = (itemToAdd) => {
    updateCartItemsReducer(addCartItem(cartItems, itemToAdd));
  };
  const decreaseItemFromCart = (itemToDecrease) => {
    updateCartItemsReducer(decreaseCartItem(cartItems, itemToDecrease));
  };
  const removeItemFromCart = (itemToRemove) => {
    updateCartItemsReducer(removeCartItem(cartItems, itemToRemove));
  };

  const setIsCartOpen = (bool) => {
    const payload = {
      isCartOpen: bool,
    };
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    decreaseItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React, { createContext, useEffect, useRef, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const CART_KEY = "rakhi-store-cart";
const CUSTOM_KEY = "rakhi-store-custom";

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage can be unavailable (private mode); the cart still works in memory
  }
};

// restore the saved cart, dropping anything that is no longer a valid product
const loadCart = () => {
  const saved = readStorage(CART_KEY, {});
  const cart = {};
  for (const id in saved) {
    if (saved[id] > 0 && all_product.some((p) => p.id === Number(id))) {
      cart[id] = saved[id];
    }
  }
  return cart;
};

// custom name rakhis: { key, names: [{ text, spelling, qty }], motiColour, instructions, baseProductId }
const loadCustomItems = () => {
  const saved = readStorage(CUSTOM_KEY, []);
  return Array.isArray(saved) ? saved.filter((item) => item && item.key && item.names?.length) : [];
};

export const customRakhiCount = (item) => item.names.reduce((sum, name) => sum + name.qty, 0);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(loadCart);
  const [customItems, setCustomItems] = useState(loadCustomItems);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => writeStorage(CART_KEY, cartItems), [cartItems]);
  useEffect(() => writeStorage(CUSTOM_KEY, customItems), [customItems]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (itemId, quantity = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
    showToast(quantity > 1 ? `${quantity} rakhis added to cart` : "Added to cart");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      if (next[itemId] > 1) next[itemId] -= 1;
      else delete next[itemId];
      return next;
    });
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  // adds a new custom rakhi, or replaces the one with the same key when editing
  const saveCustomItem = (item) => {
    const key = item.key || `custom-${Date.now()}`;
    setCustomItems((prev) =>
      prev.some((c) => c.key === key)
        ? prev.map((c) => (c.key === key ? { ...item, key } : c))
        : [...prev, { ...item, key }]
    );
    return key;
  };

  const removeCustomItem = (key) => setCustomItems((prev) => prev.filter((c) => c.key !== key));

  const clearCart = () => {
    setCartItems({});
    setCustomItems([]);
  };

  // total for ready-made rakhis; custom rakhis are priced on WhatsApp
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = all_product.find((product) => product.id === Number(item));
      if (itemInfo) totalAmount += itemInfo.new_price * cartItems[item];
    }
    return totalAmount;
  };

  const getReadyMadeCount = () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const getCustomCount = () => customItems.reduce((sum, item) => sum + customRakhiCount(item), 0);
  const getTotalCartItems = () => getReadyMadeCount() + getCustomCount();

  const contextValue = {
    all_product,
    cartItems,
    customItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    saveCustomItem,
    removeCustomItem,
    clearCart,
    getTotalCartAmount,
    getReadyMadeCount,
    getCustomCount,
    getTotalCartItems,
    showToast,
    toast,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;

import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

 const CartContext = createContext(null);

export default function CartProvider ({children}) {
    const [cartItems, setCartItems] = useState([]); // { id: 2, quantity: 7}

    function addToCart(productId) {
       const existing = cartItems.find((cartItem) => cartItem.id === productId);
       
       if(existing) {
         const currentQuantity = existing.quantity;
         const updatedCartItems = cartItems.map((cartItem) => cartItem.id === productId ? {id: productId, quantity: currentQuantity+1}
         : cartItem);
         setCartItems(updatedCartItems);
       } else {
         setCartItems([...cartItems, {id: productId, quantity: 1}]);
       }

    }

    function getCartItemsWithProducts() {
      return cartItems.map((cartItem) => ({
          ...cartItem,
          product: getProductById(Number(cartItem.id))
        })).filter(cartItem => cartItem.product);
    }

    function removeFromCart(productId) {
      setCartItems(cartItems.filter((cartItem) => {
         return cartItem.id !== productId;
      }));
    }

    function updateQuantity(productId, quantity) {
      if(quantity <= 0) {
        removeFromCart(productId);
        return;
      }

        setCartItems(cartItems.map((cartItem) => {
          return cartItem.id === productId ? { ...cartItem, quantity } : cartItem
        }));
    }

    function getCartTotal() {
      const total = cartItems.reduce((total, cartItem) => {
        const product = getProductById(cartItem.id);
        return total + (product ? product.price * cartItem.quantity : 0);
      }, 0);

      return total;
    }

    function clearCart() {
      setCartItems([]);
    }

    return (
    <CartContext.Provider value={{
       cartItems, addToCart, getCartItemsWithProducts, updateQuantity, removeFromCart, getCartTotal, clearCart
       }}>
       {children}
    </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);  
                                              // CUSTOM HOOK FOR AVOIDING IMPORTING AUTH CONTEXT EVERY TIME WE WANT TO ACCESS IT 
    return context; 
}
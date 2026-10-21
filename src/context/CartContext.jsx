import { createContext, useState, useContext } from "react";

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

    return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
       {children}
    </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);  
                                              // CUSTOM HOOK FOR AVOIDING IMPORTING AUTH CONTEXT EVERY TIME WE WANT TO ACCESS IT 
    return context; 
}
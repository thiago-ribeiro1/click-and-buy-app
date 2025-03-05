import React, { createContext, useContext, useState } from "react";

// Definição da estrutura do produto no carrinho
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: any;
}

// Tipagem do Contexto
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  total: number;
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Criando o Provider do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Função para remover um item do carrinho
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Cálculo do total
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acessar o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

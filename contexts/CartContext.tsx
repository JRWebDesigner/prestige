'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Cart } from '@/types/cart';
import { Perfume } from '@/types/perfume';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Perfume }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: Cart;
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (perfumeId: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.perfume.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.perfume.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [
          ...state.items,
          {
            perfume: {
              id: action.payload.id,
              name: action.payload.name,
              brand: action.payload.brand,
              price: action.payload.price,
              image: action.payload.image,
              size: action.payload.size,
              category: action.payload.category,
            },
            quantity: 1,
          },
        ],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.perfume.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.perfume.id !== action.payload.id),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.perfume.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const cart: Cart = {
    items: state.items,
    total: state.items.reduce((sum, item) => sum + (item.perfume.price * item.quantity), 0),
    itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
  };

  const addToCart = (perfume: Perfume) => {
    dispatch({ type: 'ADD_ITEM', payload: perfume });
  };

  const removeFromCart = (perfumeId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: perfumeId });
  };

  const updateQuantity = (perfumeId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: perfumeId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Cart } from '@/types/cart';
import { Perfume } from '@/types/perfume';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { perfume: Perfume; selectedSize: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: Cart;
  addToCart: (perfume: Perfume, selectedSize: string) => void;
  removeFromCart: (perfumeId: string, size: string) => void;
  updateQuantity: (perfumeId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { perfume, selectedSize } = action.payload;
      const sizeData = perfume.sizes.find(s => s.size === selectedSize) || perfume.sizes[0];
      const existingItem = state.items.find(item => 
        item.perfume.id === perfume.id && item.selectedSize === selectedSize
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.perfume.id === perfume.id && item.selectedSize === selectedSize
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
              id: perfume.id,
              name: perfume.name,
              brand: perfume.brand,
              price: sizeData.price,
              image: perfume.image,
              size: selectedSize,
              category: perfume.category,
            },
            quantity: 1,
            selectedSize: selectedSize,
          },
        ],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.perfume.id === action.payload.split('-')[0] && item.selectedSize === action.payload.split('-')[1])
        ),
      };
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => 
            !(item.perfume.id === action.payload.id && item.selectedSize === action.payload.size)
          ),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.perfume.id === action.payload.id && item.selectedSize === action.payload.size
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

  const addToCart = (perfume: Perfume, selectedSize: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { perfume, selectedSize } });
  };

  const removeFromCart = (perfumeId: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: `${perfumeId}-${size}` });
  };

  const updateQuantity = (perfumeId: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: perfumeId, size, quantity } });
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

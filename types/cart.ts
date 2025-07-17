export interface CartItem {
  perfume: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    size: string;
    category: string;
  };
  quantity: number;
  selectedSize: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

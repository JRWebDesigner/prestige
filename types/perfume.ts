export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'masculino' | 'femenino' | 'unisex';
  size: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  inStock: boolean;
  featured: boolean;
}

export interface ComboItem {
  perfume: Perfume;
  quantity: number;
}

export interface Combo {
  items: ComboItem[];
  totalPrice: number;
  discount: number;
}
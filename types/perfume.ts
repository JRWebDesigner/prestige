export interface Perfume {
  id: string;
  name: string;
  brand: string;
  originalPrice?: number;
  sizes: {
    size: string;
    price: number;
    originalPrice?: number;
  }[];
  description: string;
  image: string;
  category: 'masculino' | 'femenino' | 'unisex';
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  inStock: boolean;
  featured: boolean;
  set: boolean;
  spring: boolean;
  summer: boolean;
  winter: boolean;
  autumn: boolean;
}

export interface ComboItem {
  perfume: Perfume;
  quantity: number;
  selectedSize: string;
}

export interface Combo {
  items: ComboItem[];
  totalPrice: number;
  discount: number;
}

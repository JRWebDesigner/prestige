import { Image } from 'sanity'

export interface SanityPerfume {
  _id: string
  name: string
  slug: {
    current: string
  }
  description: string
  image: Image
  gallery?: Image[]
  sizes: {
    size: string
    price: number
    originalPrice?: number
  }[]
  notes: {
    top: string[]
    heart: string[]
    base: string[]
  }
  inStock: boolean
  featured: boolean
  order: number
  brand: {
    name: string
    slug: {
      current: string
    }
  }
  category: {
    name: string
    value: 'masculino' | 'femenino' | 'unisex'
    slug: {
      current: string
    }
  }
}

export interface SanityBrand {
  _id: string
  name: string
  slug: {
    current: string
  }
  logo?: Image
  description?: string
}

export interface SanityCategory {
  _id: string
  name: string
  slug: {
    current: string
  }
  value: 'masculino' | 'femenino' | 'unisex'
  description?: string
}
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
  set: boolean
  spring: boolean
  summer: boolean
  winter: boolean
  autumn: boolean
  brand: {
    name: string
  }
  category: 'masculino' | 'femenino' | 'unisex'
}

export interface SanityBrand {
  _id: string
  name: string
}

import { groq } from 'next-sanity'

export const perfumesQuery = groq`
  *[_type == "perfume"] | order(order asc, _createdAt desc) {
    _id,
    name,
    slug,
    description,
    image,
    gallery,
    sizes,
    notes,
    inStock,
    featured,
    order,
    set,
    spring,
    summer,
    winter,
    autumn,
    brand->{
      name
    },
    category
  }
`

export const perfumeBySlugQuery = groq`
  *[_type == "perfume" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image,
    gallery,
    sizes,
    notes,
    inStock,
    featured,
    order,
    set,
    spring,
    summer,
    winter,
    autumn,
    brand->{
      name
    },
    category
  }
`

export const featuredPerfumesQuery = groq`
  *[_type == "perfume" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    name,
    slug,
    description,
    image,
    sizes,
    inStock,
    featured,
    set,
    spring,
    summer,
    winter,
    autumn,
    brand->{
      name
    },
    category
  }
`

export const brandsQuery = groq`
  *[_type == "brand"] | order(name asc) {
    _id,
    name
  }
`

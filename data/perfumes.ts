import { Perfume } from '@/types/perfume';

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Le Male Elixir de Jean Paul Gaultier',
    brand: 'perfume',
    originalPrice: 200,
    description: 'Le Male Elixir de Jean Paul Gaultier es una fragancia de la familia olfativa Oriental Fougère para Hombres. Esta fragrancia es nueva. Le Male Elixir se lanzó en 2023. La Nariz detrás de esta fragrancia es Quentin Bisch. Las Notas de Salida son lavanda y menta; las Notas de Corazón son vainilla y benjuí; las Notas de Fondo son miel, haba tonka y tabaco.',
    image: '/perfume1.jpg',
    category: 'masculino',
    sizes: [
      { size: '1ML', price: 38 },
      { size: '2ML', price: 72 },
      { size: '4ML', price: 135 },
      { size: '5ML', price: 165 }
    ],
    notes: {
      top: ['Bergamota', 'Pimienta'],
      heart: ['Geranio', 'Lavanda', 'Elemi'],
      base: ['Ambroxan', 'Cedro', 'Labdanum']
    },
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: '9pm de Afnan',
    brand: 'perfume',
    originalPrice: 380,
    description: '9pm de Afnan es una fragancia de la familia olfativa Oriental Vainilla para Hombres. 9pm se lanzó en 2020. Las Notas de Salida son manzana, canela, lavanda silvestre y bergamota; las Notas de Corazón son flor de azahar del naranjo y lirio de los valles (muguete); las Notas de Fondo son vainilla, haba tonka, ámbar y pachulí.',
    image: '/perfume3.jpg',
    category: 'masculino',
    sizes: [
      { size: '1ML', price: 42 },
      { size: '2ML', price: 79 },
      { size: '4ML', price: 148 },
      { size: '5ML', price: 180 }
    ],
    notes: {
      top: ['Pera', 'Pimienta Rosa', 'Flor de Naranjo'],
      heart: ['Café', 'Jazmín', 'Almendra Amarga'],
      base: ['Vainilla', 'Pachulí', 'Cedro']
    },
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Khamrah de Lattafa',
    brand: 'perfume',
    originalPrice: 400,
    description: 'Khamrah de Lattafa Perfumes es una fragancia de la familia olfativa Oriental Especiada para Hombres y Mujeres. Esta fragrancia es nueva. Khamrah se lanzó en 2022. Las Notas de Salida son canela, nuez moscada y bergamota; las Notas de Corazón son dátiles, praliné, nardos y Mahonial; las Notas de Fondo son vainilla, haba tonka, Amberwood, mirra, benjuí y Akigalawood.',
    image: '/perfume2.jpg',
    category: 'masculino',
    sizes: [
      { size: '1ML', price: 42 },
      { size: '2ML', price: 79 },
      { size: '4ML', price: 148 },
      { size: '5ML', price: 180 }
    ],
    notes: {
      top: ['Pera', 'Pimienta Rosa', 'Flor de Naranjo'],
      heart: ['Café', 'Jazmín', 'Almendra Amarga'],
      base: ['Vainilla', 'Pachulí', 'Cedro']
    },
    inStock: true,
    featured: true
  }
];

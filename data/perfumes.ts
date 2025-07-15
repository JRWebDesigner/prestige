import { Perfume } from '@/types/perfume';

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Le Male Elixir de Jean Paul Gaultier',
    brand: 'perfume',
    price: 100,
    originalPrice: 200,
    description: 'Le Male Elixir de Jean Paul Gaultier es una fragancia de la familia olfativa Oriental Fougère para Hombres. Esta fragrancia es nueva. Le Male Elixir se lanzó en 2023. La Nariz detrás de esta fragrancia es Quentin Bisch. Las Notas de Salida son lavanda y menta; las Notas de Corazón son vainilla y benjuí; las Notas de Fondo son miel, haba tonka y tabaco.',
    image: './perfume1.jpg',
    category: 'masculino',
    size: '100ml',
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
    price: 380,
    description: '9pm de Afnan es una fragancia de la familia olfativa Oriental Vainilla para Hombres. 9pm se lanzó en 2020. Las Notas de Salida son manzana, canela, lavanda silvestre y bergamota; las Notas de Corazón son flor de azahar del naranjo y lirio de los valles (muguete); las Notas de Fondo son vainilla, haba tonka, ámbar y pachulí.',
    image: './perfume2.jpg',
    category: 'masculino',
    size: '90ml',
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
    price: 420,
    description: 'Khamrah de Lattafa Perfumes es una fragancia de la familia olfativa Oriental Especiada para Hombres y Mujeres. Esta fragrancia es nueva. Khamrah se lanzó en 2022. Las Notas de Salida son canela, nuez moscada y bergamota; las Notas de Corazón son dátiles, praliné, nardos y Mahonial; las Notas de Fondo son vainilla, haba tonka, Amberwood, mirra, benjuí y Akigalawood.',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'masculino',
    size: '100ml',
    notes: {
      top: ['Limón', 'Bergamota', 'Neroli'],
      heart: ['Jazmín', 'Calone', 'Ciclamen'],
      base: ['Musgo Blanco', 'Maderas', 'Almizcle']
    },
    inStock: true,
    featured: false
  }
];

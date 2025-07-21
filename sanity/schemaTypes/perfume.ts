import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'perfume',
  title: 'Perfume',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'branduni',
      title: 'Marca',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'brand'}})],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categoryuni',
      title: 'Categoría',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
    defineField({
      name: 'sizes',
      title: 'Tamaños y Precios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Tamaño',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'price',
              title: 'Precio',
              type: 'number',
              validation: Rule => Rule.required().min(0),
            },
            {
              name: 'originalPrice',
              title: 'Precio Original (opcional)',
              type: 'number',
              validation: Rule => Rule.min(0),
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'notes',
      title: 'Notas Olfativas',
      type: 'object',
      fields: [
        {
          name: 'top',
          title: 'Notas de Salida',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'heart',
          title: 'Notas de Corazón',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'base',
          title: 'Notas de Fondo',
          type: 'array',
          of: [{ type: 'string' }],
        }
      ]
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Producto Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'set',
      title: 'Es un Set',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'spring',
      title: 'Primavera',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'summer',
      title: 'Verano',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'winter',
      title: 'Invierno',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'autumn',
      title: 'Otoño',
      type: 'boolean',
      initialValue: false,
    })
  ],
  preview: {
    select: {
      title: 'name',
      branduni: 'brand.name',
      media: 'image',
    }
  }
})

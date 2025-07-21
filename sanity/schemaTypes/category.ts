import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'value',
      title: 'Valor (masculino, femenino, unisex)',
      type: 'string',
      options: {
        list: [
          { title: 'Masculino', value: 'masculino' },
          { title: 'Femenino', value: 'femenino' },
          { title: 'Unisex', value: 'unisex' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'value'
    }
  }
})
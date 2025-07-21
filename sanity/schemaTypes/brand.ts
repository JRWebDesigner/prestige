import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Marca',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Marca',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
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
      media: 'logo'
    }
  }
})
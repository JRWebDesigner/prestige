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
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
})

import { type SchemaTypeDefinition } from 'sanity'
import perfume from './perfume'
import category from './category'
import brand from './brand'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [perfume, category, brand],
}

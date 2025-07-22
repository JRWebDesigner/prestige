import { type SchemaTypeDefinition } from 'sanity'
import perfume from './perfume'
import brand from './brand'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [perfume, brand],
}

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Sahed Alom Sumit | Studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'vbkdnotg',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/sanity',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})

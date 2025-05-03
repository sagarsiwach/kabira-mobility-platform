// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema' // Import from index
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './sanity.structure' // Import structure

// Load environment variables
const projectId = 'vqqzvr1q'
const dataset = 'production'

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity project ID or dataset. Check your environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET)!`,
  )
}

export default defineConfig({
  name: 'default',
  title: 'Kabira Mobility CMS', // Updated Title

  projectId: projectId,
  dataset: dataset,

  plugins: [structureTool({structure}), visionTool(), colorInput(), codeInput()],

  schema: {
    types: schemaTypes, // Use imported schema types
  },
})

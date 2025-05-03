// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './sanity.structure'

export default defineConfig({
  name: 'default',
  title: 'Kabira Mobility',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vqqzvr1q', // Fallback only for initial setup
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', // Fallback only for initial setup
  plugins: [structureTool({structure}), visionTool(), colorInput(), codeInput()],
  schema: {
    types: schemaTypes,
  },
})

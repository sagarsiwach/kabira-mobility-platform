import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema'
import {colorInput} from '@sanity/color-input'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Kabira Mobility',
  projectId: 'vqqzvr1q',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), colorInput(), codeInput()],
  schema: {
    types: schemaTypes,
  },
})

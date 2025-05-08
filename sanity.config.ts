// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema' // Import from index
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './sanity.structure' // Import structure
// import 'dotenv/config' // <--- REMOVE OR COMMENT OUT THIS LINE

// --- Determine API Version (Use a consistent recent date) ---
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-03-15'

// --- Load Project ID and Dataset ---
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vqqzvr1q'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity project ID or dataset. Check your environment variables (e.g., SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET)!`,
  )
}

export default defineConfig({
  name: 'default',
  title: 'Kabira Mobility CMS',

  projectId,
  dataset,
  apiVersion,

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    colorInput(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            !['siteSettings', 'homePage', 'blogPage', 'faqPage', 'testRidePage'].includes(
              templateItem.templateId,
            ),
        )
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      const singletonTypes = ['siteSettings', 'homePage', 'blogPage', 'faqPage', 'testRidePage']

      if (singletonTypes.includes(schemaType)) {
        return prev.filter(({action}) => !['duplicate', 'discardChanges'].includes(action ?? ''))
      }
      return prev
    },
  },
})

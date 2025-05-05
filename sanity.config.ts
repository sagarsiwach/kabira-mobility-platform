// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema' // Import from index
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './sanity.structure' // Import structure

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vqqzvr1q'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity project ID or dataset. Check your environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET)!`,
  )
}

export default defineConfig({
  name: 'default',
  title: 'Kabira Mobility CMS', // Updated Title

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool(), colorInput(), codeInput()],

  schema: {
    types: schemaTypes, // Use imported schema types
  },

  document: {
    // New section to help with singletons
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            ![
              'siteSettings',
              'homePage',
              'navigationSettings',
              'blogPage',
              'faqPage',
              'testRidePage',
            ].includes(templateItem.templateId),
        )
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      // Define singleton types that shouldn't be duplicated
      const singletonTypes = [
        'siteSettings',
        'homePage',
        'navigationSettings',
        'blogPage',
        'faqPage',
        'testRidePage',
      ]

      if (singletonTypes.includes(schemaType)) {
        // Filter out actions that aren't edit, publish or delete
        return prev.filter(({action}) =>
          ['edit', 'publish', 'unpublish', 'delete'].includes(action),
        )
      }
      return prev
    },
  },
})

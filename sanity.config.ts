// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema' // Import from index
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './sanity.structure' // Import structure
import 'dotenv/config' // Make sure dotenv is configured if you use environment variables here

// --- Determine API Version (Use a consistent recent date) ---
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-03-15' // <<< CHANGED: Using a specific recent date

// --- Load Project ID and Dataset ---
// It's generally recommended to use environment variables prefixed for your app/framework
// For Next.js, it would be process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// For Vite, it would be import.meta.env.VITE_SANITY_PROJECT_ID
// Using generic names here, adjust prefix if needed for your setup
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
  apiVersion, // <<< ADDED: Provide the API Version to the core client

  plugins: [
    structureTool({structure}),
    // Pass the same API version to the vision tool for consistency
    visionTool({defaultApiVersion: apiVersion}), // <<< CHANGED: Added defaultApiVersion
    colorInput(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes, // Use imported schema types
  },

  document: {
    // Filter out singleton types from the global "new document" menu
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            ![
              'siteSettings',
              'homePage',
              // 'navigationSettings', // This type wasn't defined in your schema/index.ts
              'blogPage',
              'faqPage',
              'testRidePage',
            ].includes(templateItem.templateId),
        )
      }
      return prev
    },
    // Prevent certain actions (like 'duplicate') for singleton types
    actions: (prev, {schemaType}) => {
      const singletonTypes = [
        'siteSettings',
        'homePage',
        // 'navigationSettings', // Removed as it's not defined
        'blogPage',
        'faqPage',
        'testRidePage',
      ]

      if (singletonTypes.includes(schemaType)) {
        // Filter out actions that create new instances or are problematic for singletons
        return prev.filter(({action}) => !['duplicate', 'discardChanges'].includes(action ?? ''))
      }
      return prev
    },
  },
})

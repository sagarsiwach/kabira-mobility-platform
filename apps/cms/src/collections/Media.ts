// apps/cms/src/collections/Media.ts
import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
// Adjust dirname for different environments (dev vs. build)
// This might need refinement depending on your deployment structure
const dirname = path.resolve(path.dirname(filename), '../../') // Go up two levels from dist/collections

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, 'media'), // Relative path from project root for media storage
    // Ensure Payload has write access to this directory in production
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre', formatOptions: { format: 'webp', quality: 80 } },
      { name: 'card', width: 768, height: null, position: 'centre', formatOptions: { format: 'webp', quality: 80 } },
      { name: 'tablet', width: 1024, height: null, position: 'centre', formatOptions: { format: 'webp', quality: 80 } },
      { name: 'feature', width: 1600, height: null, position: 'centre', formatOptions: { format: 'webp', quality: 85 } }, // For featured images
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'], // Allowed types
    formatOptions: { format: 'webp', quality: 80 }, // Default conversion format
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user, // Require login to upload
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
      localized: true,
    },
    // Optional: Caption can be added if needed
    // {
    //   name: 'caption',
    //   label: 'Caption',
    //   type: 'richText',
    //   localized: true,
    // },
  ],
  timestamps: true,
}

export default Media;
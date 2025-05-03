// schema/objects/downloadItem.ts
import {defineField, defineType} from 'sanity'
import {DownloadIcon} from '@sanity/icons'

export default defineType({
  name: 'downloadItem',
  title: 'Download Item',
  type: 'object',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The display name for the downloadable file (e.g., "KM4000 Brochure").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'string',
      description: 'A short description of the file content.',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload the actual file (PDF, image, etc.).',
      options: {
        // Optionally restrict accepted file types
        // accept: '.pdf,.jpg,.png',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      fileName: 'file.asset.originalFilename', // Get the original filename
    },
    prepare({title, fileName}) {
      return {
        title: title || 'Untitled Download',
        subtitle: fileName || 'No file uploaded',
        icon: DownloadIcon,
      }
    },
  },
})

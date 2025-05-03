// schema/objects/downloadList.ts
import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons' // Using DocumentsIcon

export default defineType({
  name: 'downloadList',
  title: 'Download List Block',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (Optional)',
      type: 'string',
      description: 'Heading for the downloads section (e.g., "Brochures & Manuals").',
    }),
    defineField({
      name: 'items',
      title: 'Download Items',
      type: 'array',
      description: 'Add the files available for download.',
      of: [{type: 'downloadItem'}],
      validation: (Rule) => Rule.required().min(1).error('Add at least one download item.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({title, itemCount}) {
      return {
        title: title || 'Download List Block',
        subtitle: `${itemCount || 0} item(s)`,
        icon: DocumentsIcon,
      }
    },
  },
})

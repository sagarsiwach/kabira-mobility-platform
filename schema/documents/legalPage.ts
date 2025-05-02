import {defineField, defineType} from 'sanity'
import {BillIcon} from '@sanity/icons'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: BillIcon,
  groups: [
     { name: 'content', title: 'Content', default: true },
     { name: 'seo', title: 'SEO' },
   ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The official title of the legal document (e.g., Privacy Policy, Terms of Service).',
      validation: Rule => Rule.required(),
    }),
     defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
       options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      description: 'URL identifier for this page.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (Optional)',
      type: 'string',
      group: 'content',
      description: 'An optional subtitle for additional context.',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      group: 'content',
      description: 'The date when this document was last officially updated.',
      initialValue: () => new Date().toISOString().split('T')[0],
       validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'blockContent',
      group: 'content',
      description: 'The full text of the legal document using the rich text editor.',
    }),

    // SEO Group
     defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for this legal page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'lastUpdated',
    },
     prepare({title, date}) {
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date';
      return {title: title || 'Untitled Legal Page', subtitle: `Last Updated: ${dateFormatted}` }
    },
  },
})
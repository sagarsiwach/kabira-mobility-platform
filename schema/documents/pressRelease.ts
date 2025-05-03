// schema/documents/pressRelease.ts
import {defineField, defineType} from 'sanity'
import {BillIcon} from '@sanity/icons' // Using BillIcon as an example

export default defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  icon: BillIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The headline of the press release.',
      validation: (Rule) => Rule.required(),
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
      description: 'URL identifier for this press release.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      group: 'content',
      description: 'The official publication date of the release.',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source (Optional)',
      type: 'string',
      group: 'content',
      description:
        'The publication or source where this was released (e.g., "Times of India", "PR Newswire").',
    }),
    defineField({
      name: 'url',
      title: 'External URL (Optional)',
      type: 'url',
      group: 'content',
      description: 'Link to the original press release if hosted externally.',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image (Optional)',
      type: 'image',
      group: 'content',
      description: 'An optional image associated with the press release.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          isHighlighted: true,
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
      description: 'The main text content of the press release.',
      validation: (Rule) => Rule.required(),
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Use the enhanced SEO object
      group: 'seo',
      description: 'Configure search engine appearance for this press release.',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishDateDesc',
      by: [{field: 'publishedDate', direction: 'desc'}],
    },
    {
      title: 'Published Date, Oldest First',
      name: 'publishDateAsc',
      by: [{field: 'publishedDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedDate',
      media: 'featuredImage',
    },
    prepare({title, date, media}) {
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: title || 'Untitled Press Release',
        subtitle: `Published: ${dateFormatted}`,
        media: media || BillIcon,
      }
    },
  },
})

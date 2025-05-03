import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata & Relations'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline for the blog post.',
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
      description: 'URL identifier generated from the title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 4,
      description: 'A short summary shown in post listings and used for SEO description fallback.',
      group: 'content',
      validation: (Rule) => Rule.required().max(200), // Added validation
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      description: 'The primary visual for the blog post. Alt text is important for SEO.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text field to image
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility. Describe the image content.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
      description: 'The main content of the blog post, using the rich text editor.',
      validation: (Rule) => Rule.required(),
    }),

    // Meta Group
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      description: 'Select the author of this post.',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      description: 'Assign one or more relevant categories.',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'tags', // New field
      title: 'Tags',
      type: 'array',
      group: 'meta',
      description: 'Add specific keywords or tags for finer filtering (optional).',
      of: [{type: 'string'}],
      options: {
        layout: 'tags', // Use tags input UI
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date & Time',
      type: 'datetime',
      group: 'meta',
      description: 'Set the date and time when this post should be considered published.',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime', // New field
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      group: 'meta',
      description: 'Optional: Manually set the estimated reading time.',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'relatedPosts', // New field
      title: 'Related Posts (Manual)',
      type: 'array',
      group: 'meta',
      description: 'Optional: Manually select other posts to show as related.',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Use the enhanced SEO object
      group: 'seo',
      description: 'Override default SEO settings for this specific post.',
    }),
  ],
  orderings: [
    {
      title: 'Publish Date, Newest First',
      name: 'publishDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Publish Date, Oldest First',
      name: 'publishDateAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {authorName, date} = selection
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date'
      const subtitle = authorName ? `by ${authorName} on ${dateFormatted}` : dateFormatted
      return {...selection, subtitle: subtitle}
    },
  },
})

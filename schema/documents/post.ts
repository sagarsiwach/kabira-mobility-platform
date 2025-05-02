import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
     { name: 'content', title: 'Content', default: true },
     { name: 'meta', title: 'Metadata & Relations' }, // Renamed Group
     { name: 'seo', title: 'SEO' },
   ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline for the blog post.',
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
      description: 'URL identifier generated from the title.',
      validation: Rule => Rule.required(),
    }),
     defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 4,
      description: 'A short summary shown in post listings and potentially used for SEO description if not set explicitly.',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      description: 'The primary visual for the blog post.',
      options: {
        hotspot: true,
      },
       validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
      description: 'The main content of the blog post, using the rich text editor.',
    }),

    // Meta Group
     defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      description: 'Select the author of this post.',
      to: {type: 'author'},
      validation: Rule => Rule.required(),
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
      name: 'publishedAt',
      title: 'Published Date & Time',
      type: 'datetime',
      group: 'meta',
      description: 'Set the date and time when this post should be considered published.',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),

    // SEO Group
     defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Override default SEO settings for this specific post.',
    }),
  ],
  orderings: [ // Add default sorting in the Studio list view
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
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name', // Access nested field
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {authorName, date} = selection
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date'
      const subtitle = authorName ? `by ${authorName} on ${dateFormatted}` : dateFormatted
      return {...selection, subtitle: subtitle } // Use base selection and add subtitle
    },
  },
})
// schema/documents/post.ts
import {defineField, defineType, SlugValue} from 'sanity' // Import SlugValue
import {DocumentTextIcon} from '@sanity/icons'

// Helper type for prepare function
interface PostPreviewSelection {
  title?: string
  authorName?: string
  media?: any // Media type can be complex
  date?: string
}
// Helper type for context
type PostContext = {
  // More specific context if needed
  document?: {_id?: string; slug?: SlugValue} // Add slug for context check
  getClient: (options: {apiVersion: string}) => {
    fetch: <T = any>(query: string, params?: Record<string, any>) => Promise<T>
  }
}

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
    // --- Content Group ---
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
        isUnique: async (value, context) => {
          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')
          // Use context.document.slug?.current if checking an existing document
          const currentSlug = context.document?.slug?.current
          // Prevent check if slug/id is missing (during initial creation)
          if (!value || (!id && !currentSlug)) return true

          const params = {draft: `drafts.${id}`, published: id, slug: value}
          // Check against slug.current
          const query = `!defined(*[_type == 'post' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed:', error)
            return `Uniqueness check failed: ${error.message}` // Return error message
          }
        },
      },
      group: 'content',
      description: 'URL identifier generated from the title. Must be unique.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 4,
      description: 'A short summary shown in post listings and used for SEO description fallback.',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(10).max(200).error('Excerpt must be between 10 and 200 characters.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      description: 'The primary visual for the blog post. Alt text is crucial.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'REQUIRED: Important for SEO & accessibility. Describe the image content.',
          validation: (Rule) => Rule.required().error('Alternative text cannot be empty.'),
          // isHighlighted: true, // REMOVED: Not a standard property
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption (Optional)',
          description: 'Optional text displayed below the image.',
        }),
      ],
      validation: (Rule) => Rule.required(), // Main image itself is required
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
      description: 'The main content of the blog post, using the rich text editor.',
      validation: (Rule) => Rule.required(),
    }),

    // --- Meta Group ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      description: 'Select the author of this post.',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      description: 'Assign one or more relevant categories. Categories must be unique.',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      description:
        'Add specific keywords or tags for finer filtering (optional). Tags must be unique.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.unique(),
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
      name: 'readingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      group: 'meta',
      description: 'Optional: Manually set the estimated reading time.',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts (Manual)',
      type: 'array',
      group: 'meta',
      description:
        'Optional: Manually select other posts to show as related. Posts must be unique.',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
          options: {
            filter: ({document}: {document: {_id?: string}}) => {
              const currentId = document?._id?.replace('drafts.', '') || ''
              return currentId
                ? {filter: '_id != $currentId', params: {currentId}}
                : {filter: 'true'}
            },
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
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
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection: PostPreviewSelection) {
      const {title, authorName, media, date} = selection
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date'
      const subtitle = authorName ? `by ${authorName} on ${dateFormatted}` : dateFormatted
      return {
        title: title || 'Untitled Post',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})

// schema/documents/genericPage.ts
import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'genericPage',
  title: 'Generic Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Page Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'The main title of the page (e.g., About Us, Support).',
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
      description: 'URL identifier for this page (e.g., /about-us).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Content Builder',
      type: 'array',
      group: 'content',
      initialValue: [],
      description: 'Add and arrange content blocks to build the page.',
      of: [
        {type: 'blockContent', title: 'Text Block'},
        {
          type: 'image',
          title: 'Image Block',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility. Describe the image content.',
              validation: (Rule) => Rule.required(),
              isHighlighted: true,
            }),
          ],
        },
        {type: 'videoBlock', title: 'Featured Video Block'},
        {type: 'galleryBlock', title: 'Image Gallery'}, // <<< ADDED
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        // {type: 'featureCarouselBlock', title: 'Feature Carousel'}, // Add if needed for generic pages
        // {type: 'faqBlock', title: 'FAQ Section'}, // Add if needed for generic pages
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Page must have at least one content block.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for this page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Generic Page',
        subtitle: slug ? `/${slug}` : 'No slug set',
      }
    },
  },
})

// schema/documents/genericPage.ts
import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons' // Use a generic icon

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
    // Content Group
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
      description: 'Add and arrange content blocks to build the page.',
      of: [
        // Define the types of blocks that can be added
        {type: 'blockContent', title: 'Text Block'},
        {
          type: 'image',
          title: 'Image Block',
          options: {hotspot: true},
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
        },
        {type: 'videoSection', title: 'Video Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'downloadList', title: 'Download List'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'testimonialSection', title: 'Testimonials Block'},
        // Add other relevant block types: featureCarousel etc. if needed
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Page must have at least one content block.'),
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Use the enhanced SEO object
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

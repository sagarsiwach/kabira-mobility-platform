// schema/documents/productPage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'productPage',
  title: 'Product Marketing Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Page Content', default: true},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description:
        'The primary title displayed on this specific marketing page (e.g., "Experience the All-New KM4000").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      group: 'content',
      description:
        'URL identifier for this page relative to /products/ (e.g., "km4000-launch" becomes /products/km4000-launch). Must be unique.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (value, context) => {
          if (!value) return true

          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')

          const params = {draft: `drafts.${id}`, published: id, slug: value}
          const query = `!defined(*[_type == 'productPage' && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`

          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed:', error)
            return false
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Page Status',
      type: 'boolean',
      group: 'content',
      description: 'Is this product page publicly visible?',
      initialValue: true,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Content Builder',
      type: 'array',
      group: 'content',
      description: 'Build the page by adding and arranging the following content sections:',
      of: [
        {type: 'heroSection', title: '1. Hero Section'},
        {type: 'turntableSection', title: '2. Turntable'}, // New section for 360 view
        {type: 'featureCarousel', title: '3. Feature Carousel'},
        {type: 'gallerySection', title: '4. Image Gallery'},
        {type: 'techSpecsSection', title: '5. Tech Specs'},
        {type: 'productFaqs', title: '6. Product FAQ Block'},
        {type: 'testimonialSection', title: '7. Testimonials Block'},
        {type: 'videoSection', title: '8. Video Block'},

        // Additional optional sections
        {type: 'blockContent', title: 'Text Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'downloadList', title: 'Download List'},
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Page must have at least one content block.'),
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      type: 'seoSettings',
      description: 'Configure search engine optimization settings for this specific product page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroSection.image',
      active: 'active',
    },
    prepare({title, media, active}) {
      return {
        title: title || 'Untitled Product Page',
        subtitle: `${active === false ? 'Inactive' : 'Active'} Product Page`,
        media: media || RocketIcon,
      }
    },
  },
})

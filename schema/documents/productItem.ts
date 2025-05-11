// schema/documents/productItem.ts
import {defineField, defineType, Rule} from 'sanity'
import {RocketIcon} from '@sanity/icons'

const SANITY_API_VERSION_FOR_VALIDATION = process.env.SANITY_STUDIO_API_VERSION || '2024-03-15'

export default defineType({
  name: 'productItem',
  title: 'Product Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'pageInfo', title: 'Page Information', default: true},
    {name: 'content', title: 'Page Content & Structure'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Product Page Title',
      type: 'string',
      group: 'pageInfo',
      description:
        'The main title identifying this product page (e.g., KM3000 Mark II). Used for CMS display and SEO fallback.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      group: 'pageInfo',
      description: 'Unique URL identifier: /products/{slug}. MUST be unique across Product Pages.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (value, context) => {
          if (!value) return true
          const client = context.getClient({apiVersion: SANITY_API_VERSION_FOR_VALIDATION})
          const id = context.document?._id.replace(/^drafts\./, '')
          const params = {draft: `drafts.${id}`, published: id, slug: value}
          const query = `!defined(*[_type == 'productItem' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed (productItem slug):', error)
            return false
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Is Page Active?',
      type: 'boolean',
      group: 'pageInfo',
      description: 'Should this product page be publicly accessible?',
      initialValue: true,
    }),
    defineField({
      name: 'relatedVehicleData',
      title: 'Core Vehicle Data (Optional)',
      type: 'reference',
      group: 'pageInfo',
      to: [{type: 'vehicle'}],
      description:
        'Optional: Link to the corresponding core vehicle data document. Useful if this page is primarily about one vehicle and you need to pull specs/details not directly in page builder.',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add, edit, and reorder the content sections for this product page.',
      initialValue: [],
      of: [
        {type: 'heroSectionBlock', title: 'Hero Section'},
        {type: 'configuratorSectionBlock', title: '360 Configurator'},
        {type: 'featureCarouselBlock', title: 'Feature Carousel'},
        {type: 'videoBlock', title: 'Featured Video Block'},
        {type: 'galleryBlock', title: 'Image Gallery Block'}, // <<< ADDED
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'faqBlock', title: 'FAQ Section (Referenced)'},
        // {type: 'blockContent', title: 'Rich Text Block'},
      ],
      validation: (Rule) =>
        Rule.custom((pageBuilderValue) => {
          if (!pageBuilderValue || pageBuilderValue.length === 0) {
            // return 'A product page must have at least one content section.'
          }
          return true
        }),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for this specific product page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isActive: 'active',
    },
    prepare({title, slug, isActive}) {
      let subtitle = `${isActive === false ? '🔴 Inactive | ' : ''}${slug ? `/products/${slug}` : 'No slug'}`
      return {
        title: title || 'Untitled Product Page',
        subtitle: subtitle.trim(),
        media: RocketIcon,
      }
    },
  },
})

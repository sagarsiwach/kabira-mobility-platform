// schema/documents/productItem.ts
import {defineField, defineType, Rule} from 'sanity' // Added Rule for validation
import {RocketIcon} from '@sanity/icons'

// Define a consistent API version (replace with your actual setting if different)
// This should match the apiVersion used in your sanity.config.ts for client operations
const SANITY_API_VERSION_FOR_VALIDATION = process.env.SANITY_STUDIO_API_VERSION || '2024-03-15'

export default defineType({
  name: 'productItem',
  title: 'Product Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'pageInfo', title: 'Page Information', default: true}, // Changed default group
    {name: 'content', title: 'Page Content & Structure'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Page Information Group ---
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
            return false // Fail validation on error to prevent duplicates
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
      name: 'relatedVehicleData', // Optional: Link to the core Vehicle data document
      title: 'Core Vehicle Data (Optional)',
      type: 'reference',
      group: 'pageInfo',
      to: [{type: 'vehicle'}],
      description:
        'Optional: Link to the corresponding core vehicle data document. Useful if this page is primarily about one vehicle and you need to pull specs/details not directly in page builder.',
    }),

    // --- Page Content & Structure Group ---
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add, edit, and reorder the content sections for this product page.',
      of: [
        // Define the allowed block types for product pages
        {type: 'heroSectionBlock', title: 'Hero Section'},
        {type: 'configuratorSectionBlock', title: '360 Configurator'},
        {type: 'featureCarouselBlock', title: 'Feature Carousel'}, // <-- NEWLY ADDED
        {type: 'videoSection', title: 'Video Section'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'faqBlock', title: 'FAQ Section (Referenced)'}, // For selecting existing FAQs
        // Consider if you need a simple rich text block here too:
        // {type: 'blockContent', title: 'Rich Text Block'},
      ],
      validation: (Rule) =>
        Rule.custom((pageBuilderValue) => {
          if (!pageBuilderValue || pageBuilderValue.length === 0) {
            return 'A product page must have at least one content section.'
          }
          // Example: Ensure at least one heroSectionBlock if required
          // const hasHero = pageBuilderValue.some((block: any) => block._type === 'heroSectionBlock');
          // if (!hasHero) return 'A Hero Section is required for product pages.';
          return true
        }),
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Assumes seoSettings object exists and is imported
      group: 'seo',
      description: 'Configure search engine appearance for this specific product page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isActive: 'active',
      // Optional: to show related vehicle name in preview
      // relatedVehicleName: 'relatedVehicleData.name'
    },
    prepare({title, slug, isActive /*, relatedVehicleName*/}) {
      let subtitle = `${isActive === false ? '🔴 Inactive | ' : ''}${slug ? `/products/${slug}` : 'No slug'}`
      // if (relatedVehicleName) subtitle += ` | Linked Vehicle: ${relatedVehicleName}`;
      return {
        title: title || 'Untitled Product Page',
        subtitle: subtitle.trim(),
        media: RocketIcon,
      }
    },
  },
})

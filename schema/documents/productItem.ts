// schema/documents/productItem.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

// Define a consistent API version (replace with your actual setting if different)
const apiVersion = '2024-03-15'

export default defineType({
  name: 'productItem',
  title: 'Product Page', // Represents the web page for a product
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Page Content & Structure', default: true},
    {name: 'pageInfo', title: 'Page Information'}, // Renamed group
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Page Information Group ---
    defineField({
      name: 'title',
      title: 'Product Page Title',
      type: 'string',
      group: 'pageInfo', // Changed group
      description:
        'The main title identifying this product page (e.g., KM3000 Mark II). Used for CMS display and SEO fallback.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      group: 'pageInfo', // Changed group
      description: 'Unique URL identifier: /products/{slug}. MUST be unique across Product Pages.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (value, context) => {
          if (!value) return true
          const client = context.getClient({apiVersion: apiVersion})
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
    // REMOVED relatedVehicle field
    defineField({
      name: 'active',
      title: 'Is Page Active?',
      type: 'boolean',
      group: 'pageInfo', // Changed group
      description: 'Should this product page be publicly accessible?',
      initialValue: true,
    }),

    // --- Page Content & Structure Group ---
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add, edit, and reorder the content sections for this product page.',
      of: [
        // Define the allowed block types
        {type: 'heroSectionBlock', title: 'Hero Section'}, // Needs modification
        {type: 'configuratorSectionBlock', title: '360 Configurator'}, // Needs significant modification
        // Add other block types here later
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('A product page must have at least one content section.'),
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Assumes seoSettings object exists
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
      const subtitle = `${isActive === false ? '🔴 Inactive | ' : ''}${slug ? `/products/${slug}` : 'No slug'}`
      return {
        title: title || 'Untitled Product Page',
        subtitle: subtitle.trim(),
        media: RocketIcon, // No vehicle image to pull from
      }
    },
  },
})

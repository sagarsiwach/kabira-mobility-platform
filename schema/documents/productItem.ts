// schema/documents/productItem.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'productItem',
  title: 'Product Item', // This represents the product data itself
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title', // Changed title slightly for clarity
      type: 'string',
      description: 'The name of the product (e.g., KM3000 Mark II).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      description: 'Unique URL identifier for this product page: /products/{slug}',
      options: {
        source: 'title', // Generate slug from Product Title
        maxLength: 96,
        // --- IMPORTANT: Add uniqueness constraint ---
        isUnique: async (value, context) => {
          // Check uniqueness only among 'productItem' documents
          if (!value) return true
          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')
          const params = {draft: `drafts.${id}`, published: id, slug: value}
          // Query checks for other productItems with the same slug
          const query = `!defined(*[_type == 'productItem' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed (productItem slug):', error)
            // Return false to prevent saving potentially duplicate slugs
            return false
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description', // Clarified title
      type: 'text',
      rows: 4,
      description: 'A brief summary of the product shown on the page.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Product Image', // Clarified title
      type: 'image',
      description: 'The primary image displayed on the product page.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text', // Changed title for consistency
          type: 'string',
          description: 'REQUIRED: Describe the image for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true, // Keep highlighted
        }),
      ],
      validation: (Rule) => Rule.required(), // Make main image required
    }),
    defineField({
      name: 'price',
      title: 'Base Price (Optional)',
      type: 'number',
      description:
        'Optional: Base price in ₹ (more detailed pricing might come from linked data later).',
    }),
    defineField({
      name: 'active',
      title: 'Is Active Product?', // Clarified title
      type: 'boolean',
      description: 'Should this product be publicly visible?',
      initialValue: true,
    }),
    // --- Add Link to Detailed Vehicle Data (Optional but Recommended for Future) ---
    // defineField({
    //   name: 'linkedVehicleData',
    //   title: 'Linked Vehicle Data (Optional)',
    //   type: 'reference',
    //   description: 'Optional: Link to the full Vehicle document for detailed specs, variants, etc.',
    //   to: [{ type: 'vehicle' }],
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage', // Use mainImage for preview
      slug: 'slug.current', // Show slug in preview
      isActive: 'active', // Show active status
    },
    prepare({title, media, slug, isActive}) {
      const subtitle = `${isActive === false ? '🔴 Inactive | ' : ''}${slug ? `/products/${slug}` : 'No slug'}`
      return {
        title: title || 'Untitled Product Item',
        subtitle: subtitle,
        media: media || RocketIcon,
      }
    },
  },
})

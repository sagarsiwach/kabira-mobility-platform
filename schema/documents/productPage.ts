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
    {name: 'relation', title: 'Related Vehicle'},
    {name: 'configOverrides', title: 'Configurator Overrides'},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    // --- Content Group ---
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
        source: async (doc, context) => {
          const client = context.getClient({apiVersion: '2023-01-01'})
          let prefix = doc.title || 'product'

          const vehicleRef = doc.relatedVehicle?._ref
          if (vehicleRef) {
            try {
              const vehicle = await client.fetch(`*[_id == $ref][0]{name}`, {
                ref: vehicleRef,
              })
              if (vehicle?.name) {
                prefix = `${vehicle.name}-${doc.title || 'page'}`
              }
            } catch (error) {
              console.error('Error fetching related vehicle for slug source:', error)
            }
          }

          return prefix
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 80)
        },
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
      description: 'Build the page by adding and arranging content sections below.',
      of: [
        {type: 'heroSection', title: 'Hero Section'},
        {type: 'featureCarousel', title: 'Feature Carousel'},
        {type: 'techSpecsSection', title: 'Tech Specs Block'},
        {type: 'videoSection', title: 'Video Block'},
        {type: 'testimonialSection', title: 'Testimonials Block'},
        {type: 'gallerySection', title: 'Image Gallery'},
        {type: 'productFaqs', title: 'Product FAQ Block'},
        {type: 'faqBlock', title: 'Generic FAQ Block'},
        {type: 'blockContent', title: 'Text Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'downloadList', title: 'Download List'},
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Page must have at least one content block.'),
    }),

    // --- Relation Group ---
    defineField({
      name: 'relatedVehicle',
      title: 'Related Vehicle Model',
      type: 'reference',
      group: 'relation',
      description:
        'REQUIRED: Link this marketing page to the core Vehicle Model data (provides specs, pricing, configurator setup, etc.).',
      to: [{type: 'vehicleModel'}],
      validation: (Rule) => Rule.required().error('A related vehicle model must be selected.'),
      options: {
        disableNew: true,
      },
    }),

    // --- Configurator Overrides Group ---
    defineField({
      name: 'configuratorOverrides',
      title: '360 Configurator Appearance Overrides',
      type: 'configuratorData',
      group: 'configOverrides',
      description:
        'Optional: Override default configurator appearance/behavior (e.g., rotation speed, zoom limits) for this specific page using responsive JSON data.',
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
      vehicleName: 'relatedVehicle.name',
      media: 'relatedVehicle.image',
      active: 'active',
    },
    prepare({title, vehicleName, media, active}) {
      return {
        title: title || 'Untitled Product Page',
        subtitle: `${vehicleName ? `For: ${vehicleName}` : 'No vehicle linked'} | ${
          active === false ? 'Inactive' : 'Active'
        }`,
        media: media || RocketIcon,
      }
    },
  },
})

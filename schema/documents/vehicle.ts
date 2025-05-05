// schema/documents/vehicle.ts
import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'
import {indianStates} from '../constants' // Make sure constants path is correct

// Use the same consistent API version as in sanity.config.ts
const apiVersionForValidation = '2024-03-15' // <<< ADDED constant for clarity

export default defineType({
  name: 'vehicle', // Unified name
  title: 'Vehicle', // Unified title
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'details', title: 'Core Details', default: true},
    {name: 'media', title: 'Media & Display'},
    {name: 'variantsColors', title: 'Variants & Colors'},
    {name: 'components', title: 'Options & Add-ons'},
    {name: 'configurator', title: '360 Configurator'},
    {name: 'pricingBooking', title: 'Pricing & Booking'}, // Combined group
    {name: 'marketingSeo', title: 'Marketing Page & SEO'}, // Combined group
  ],
  fields: [
    // --- Core Details Group ---
    defineField({
      name: 'name',
      title: 'Vehicle Name',
      type: 'string',
      group: 'details',
      description: 'Official display name (e.g., KM4000 Mark II).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelCode', // Kept from vehicleModel
      title: 'Model Code (for Configurator Path)',
      type: 'slug',
      group: 'details',
      description:
        'REQUIRED: Short, unique code. MUST precisely match the folder name in image storage: `.../processed_images/{modelCode}`. Case-sensitive if storage is.',
      options: {
        source: 'name',
        maxLength: 30,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
        // --- Uniqueness Check for modelCode ---
        isUnique: async (value, context) => {
          if (!value) return true
          // Use the defined API version for the client
          const client = context.getClient({apiVersion: apiVersionForValidation}) // <<< CHANGED: Use consistent apiVersion
          const id = context.document?._id.replace(/^drafts\./, '')
          const params = {draft: `drafts.${id}`, published: id, modelCode: value}
          // Ensure query matches your unique constraint logic for modelCode
          const query = `!defined(*[_type == 'vehicle' && !(_id in [$draft, $published]) && modelCode.current == $modelCode][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed (vehicle modelCode):', error) // Added type info
            return false // Fail validation on error
          }
        },
      },
      validation: (Rule) =>
        Rule.required().error('Model Code is crucial for the 360 Configurator image paths.'),
    }),
    defineField({
      name: 'slug', // Primary URL slug
      title: 'Slug (Primary URL)',
      type: 'slug',
      group: 'details',
      description:
        'Primary URL identifier for this vehicle (e.g., used for /vehicles/{slug} pages). MUST be unique.',
      options: {
        source: 'name',
        maxLength: 96,
        // --- Uniqueness Check for slug ---
        isUnique: async (value, context) => {
          if (!value) return true
          // Use the defined API version for the client
          const client = context.getClient({apiVersion: apiVersionForValidation}) // <<< CHANGED: Use consistent apiVersion
          const id = context.document?._id.replace(/^drafts\./, '')
          const params = {draft: `drafts.${id}`, published: id, slug: value}
          const query = `!defined(*[_type == 'vehicle' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed (vehicle slug):', error) // Added type info
            return false
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vehicleType', // From bookingVehicle
      title: 'Vehicle Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Motorcycle', value: 'motorcycle'},
          {title: 'Scooter', value: 'scooter'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Short Description',
      type: 'text',
      rows: 2,
      group: 'details',
      description:
        'Brief marketing description shown in listings or cards (e.g., "Electrify Your Ride").',
      validation: (Rule) => Rule.max(150),
    }),

    // --- Media & Display Group ---
    defineField({
      name: 'listingImage',
      title: 'Primary Listing Image',
      type: 'image',
      group: 'media',
      description:
        'Main promotional image used in listings, cards, social shares etc. Alt text required.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
          description: 'Crucial for accessibility & SEO.',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Optional: Vehicle Gallery
    // defineField({ name: 'vehicleGallery', /* ... */ group: 'media' }),

    // --- Variants & Colors Group ---
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      group: 'variantsColors',
      description: 'Define available versions. Mark ONE as default. Variant Codes must be unique.',
      of: [{type: 'variant'}],
      validation: (Rule) => [
        Rule.required().min(1).error('At least one variant must be defined.'),
        Rule.custom((variants) => {
          if (!variants || variants.length === 0) return true
          const defaultVariants = variants.filter((v: any) => v?.isDefault) // Added type hint
          if (defaultVariants.length !== 1) return 'Exactly one variant must be marked as default.'
          const codes = variants.map((v: any) => v?.code?.current).filter(Boolean) // Added type hint
          if (new Set(codes).size !== codes.length) return 'Variant codes must be unique.'
          return true
        }),
      ],
    }),
    defineField({
      name: 'colors',
      title: 'Color Options',
      type: 'array',
      group: 'variantsColors',
      description: 'Define color choices. Mark ONE as default. Color names must be unique.',
      of: [{type: 'colorOption'}],
      validation: (Rule) => [
        Rule.required().min(1).error('At least one color must be defined.'),
        Rule.custom((colors) => {
          if (!colors || colors.length === 0) return true
          const defaultColors = colors.filter((c: any) => c?.isDefault) // Added type hint
          if (defaultColors.length !== 1) return 'Exactly one color must be marked as default.'
          const names = colors.map((c: any) => c?.name).filter(Boolean) // Added type hint
          if (new Set(names).size !== names.length) return 'Color names must be unique.'
          return true
        }),
      ],
    }),

    // --- Options & Add-ons Group ---
    defineField({
      name: 'components',
      title: 'Applicable Options / Add-ons',
      type: 'array',
      group: 'components',
      description: 'Accessories, packages, warranties, or services available for this model.',
      of: [{type: 'componentOption'}],
      validation: (Rule) =>
        Rule.unique().error('Component codes must be unique within this vehicle.'),
    }),

    // --- 360 Configurator Group ---
    defineField({
      name: 'configuratorSetup',
      title: '360 Configurator Core Setup',
      type: 'object', // Changed from 'configuratorSetup' to 'object'
      group: 'configurator',
      description:
        'REQUIRED technical settings for the 360° image sequence: frame count & available color slugs/swatches. MUST match assets in storage.',
      fields: [
        defineField({
          name: 'frameCount',
          title: 'Total Frame Count',
          type: 'number',
          description: 'Number of frames in the 360 sequence (e.g., 36, 72)',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'colorSlugs',
          title: 'Color Slugs',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Color identifiers that match folder names in the image storage',
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Configurator Setup is required for the 3D view.'),
    }),

    // --- Pricing & Booking Group ---
    defineField({
      name: 'pricingRules',
      title: 'State Pricing',
      type: 'array',
      group: 'pricingBooking',
      of: [{type: 'pricingRule'}],
      description:
        'Define base Ex-Showroom price and required fees per state. States must be unique.',
      validation: (Rule) => [
        Rule.required().min(1).error('At least one state pricing rule is required.'), // Added more specific error
        Rule.unique().error('Each state can only have one pricing rule.'),
      ],
    }),
    defineField({
      name: 'availableInStates',
      title: 'Available In States',
      type: 'array',
      of: [{type: 'string'}],
      group: 'pricingBooking',
      description:
        'Select ALL states where this vehicle is available for booking/purchase. Drives filtering.',
      options: {list: indianStates.map((state) => state.value)}, // Use constants, map to values if needed
      validation: (Rule) =>
        Rule.required().min(1).error('Must specify at least one state where available.'),
    }),
    defineField({
      name: 'basePriceDeprecated',
      title: 'Base Price (₹) - Fallback',
      type: 'number',
      group: 'pricingBooking',
      hidden: true, // Keep hidden
      readOnly: true, // Mark as read-only to discourage use
      description: 'DEPRECATED. Use State Pricing rules instead.',
    }),
    defineField({
      name: 'bookingAmount',
      title: 'Booking Amount (₹)',
      type: 'number',
      group: 'pricingBooking',
      description: 'The amount required to place a booking online.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isBookable',
      title: 'Online Booking Enabled?',
      type: 'boolean',
      group: 'pricingBooking',
      initialValue: true,
      description:
        'Can customers currently place bookings for this specific vehicle via the website?',
    }),
    defineField({
      name: 'testRideEnabled',
      title: 'Test Ride Enabled?',
      type: 'boolean',
      group: 'pricingBooking',
      initialValue: true,
      description: 'Can users schedule a test ride for this vehicle via the website?',
    }),
    defineField({
      name: 'estimatedDeliveryTime',
      title: 'Estimated Delivery Time',
      type: 'string',
      group: 'pricingBooking',
      description: 'Informational text, e.g., "2-3 weeks", "45-60 days".',
    }),

    // --- Marketing Page & SEO Group ---
    defineField({
      name: 'linkedProductPage',
      title: 'Primary Marketing Page (Product Item)', // Clarified title
      type: 'reference', // Changed from 'string' back to 'reference' - this is better practice
      to: [{type: 'productItem'}], // Link to the Product Item document
      group: 'marketingSeo',
      description:
        'Link to the main Product Page document that markets this vehicle. Used for cross-linking.',
      // Optional: Add validation to make it required if needed
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vehiclePageSeo',
      title: 'SEO (for this specific Vehicle Data)', // Clarified title
      type: 'seoSettings',
      group: 'marketingSeo',
      description:
        'SEO settings ONLY if this Vehicle document itself has a dedicated public page (rare). Usually, the linked "Product Item" handles the main SEO.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      modelCode: 'modelCode.current',
      media: 'listingImage',
      isBookable: 'isBookable',
      slug: 'slug.current',
    },
    prepare({title, modelCode, media, isBookable, slug}) {
      const subtitle = `${modelCode ? `(${modelCode}) ` : ''}${slug ? `(/${slug}) ` : ''}${isBookable === false ? ' (Not Bookable)' : ''}`
      return {
        title: title || 'Untitled Vehicle',
        subtitle: subtitle.trim() || 'Vehicle Data',
        media: media || RocketIcon,
      }
    },
  },
})

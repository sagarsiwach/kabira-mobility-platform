// schema/documents/vehicleModel.ts
import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'

// Helper type removed as it's no longer used directly in this file's validation
// type DocumentValidationContext = { ... }

export default defineType({
  name: 'vehicleModel',
  title: 'Vehicle Model',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'variants', title: 'Variants'},
    {name: 'colors', title: 'Colors'},
    {name: 'components', title: 'Options & Add-ons'},
    {name: 'configurator', title: '360 Configurator Setup'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'pageContent', title: 'Linked Marketing Pages'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Details Group ---
    defineField({
      name: 'name',
      title: 'Model Name',
      type: 'string',
      group: 'details',
      description:
        'The official name of the vehicle model (e.g., KM3000 Mark 2). Used for display.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelCode',
      title: 'Model Code (for Configurator Path)',
      type: 'slug',
      group: 'details',
      description:
        'REQUIRED: Short, unique code. MUST precisely match the folder name in image storage: `.../processed_images/{modelCode}`. (e.g., "km3000", "km4000"). Case-sensitive if storage is.',
      options: {
        source: 'name',
        maxLength: 30,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
        isUnique: async (value, context) => {
          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')
          const currentCode = (context.document?.modelCode as any)?.current // Access current value safely
          if (!value || (!id && !currentCode)) return true
          const params = {draft: `drafts.${id}`, published: id, modelCode: value}
          const query = `!defined(*[_type == 'vehicleModel' && !(_id in [$draft, $published]) && modelCode.current == $modelCode][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed:', error)
            return `Uniqueness check failed: ${error.message}`
          }
        },
      },
      validation: (Rule) =>
        Rule.required().error(
          'Model Code is essential for the 360 Configurator image paths and must be unique.',
        ),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (for URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: async (value, context) => {
          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')
          const currentSlug = (context.document?.slug as any)?.current // Access current value safely
          if (!value || (!id && !currentSlug)) return true
          const params = {draft: `drafts.${id}`, published: id, slug: value}
          const query = `!defined(*[_type == 'vehicleModel' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed:', error)
            return `Uniqueness check failed: ${error.message}`
          }
        },
      },
      group: 'details',
      description:
        'URL-friendly identifier generated from the model name (e.g., for a potential page like /vehicles/[slug]). Often managed by the Product Page. MUST be unique.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isBookable',
      title: 'Is Bookable?',
      type: 'boolean',
      group: 'details',
      description: 'Can customers currently place bookings for this specific model?',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Short Description / Tagline',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'A brief marketing description shown in listings or cards.',
    }),
    defineField({
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      group: 'details',
      description: 'Main promotional image used in listings, cards, social shares etc.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) =>
            Rule.required().error('Alternative text is required for accessibility and SEO.'),
          // isHighlighted: true, // REMOVED: Not a standard property
          description: 'Crucial for accessibility & SEO. Describe the vehicle shown.',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // --- Variants Group ---
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      group: 'variants',
      description:
        'Define the different versions available (e.g., based on range, battery). Mark exactly ONE as default. Variant Codes must be unique.',
      of: [{type: 'variant'}],
      validation: (Rule) => [
        Rule.required().min(1).error('At least one variant must be defined.'),
        Rule.custom((variants: any[] | undefined) => {
          if (!variants) return true
          const defaultVariants = variants.filter((v) => v?.isDefault)
          if (defaultVariants.length === 0) return 'One variant must be marked as default.'
          if (defaultVariants.length > 1) return 'Only one variant can be marked as default.'
          const codes = variants.map((v) => v?.code?.current).filter(Boolean)
          if (new Set(codes).size !== codes.length) {
            return 'Variant codes must be unique within this model.'
          }
          return true
        }).error('Validation failed: Ensure exactly one default variant and unique variant codes.'),
      ],
    }),

    // --- Colors Group ---
    defineField({
      name: 'colors',
      title: 'Color Options',
      type: 'array',
      group: 'colors',
      description:
        'Define the color choices available for this model. Mark exactly ONE as default. Color names must be unique.',
      of: [{type: 'colorOption'}],
      validation: (Rule) => [
        Rule.required().min(1).error('At least one color option must be defined.'),
        Rule.custom((colors: any[] | undefined) => {
          if (!colors) return true
          const defaultColors = colors.filter((c) => c?.isDefault)
          if (defaultColors.length === 0) return 'One color must be marked as default.'
          if (defaultColors.length > 1) return 'Only one color can be marked as default.'
          const names = colors.map((c) => c?.name).filter(Boolean)
          if (new Set(names).size !== names.length) {
            return 'Color names must be unique within this model.'
          }
          return true
        }).error('Validation failed: Ensure exactly one default color and unique color names.'),
      ],
    }),

    // --- Components Group ---
    defineField({
      name: 'components',
      title: 'Applicable Options / Add-ons',
      type: 'array',
      group: 'components',
      description:
        'List all accessories, packages, warranties, or services available for this model.',
      of: [{type: 'componentOption'}],
      validation: (Rule) =>
        Rule.custom((components: any[] | undefined) => {
          if (!components) return true
          const codes = components.map((c) => c?.code?.current).filter(Boolean)
          if (new Set(codes).size !== codes.length) {
            return 'Component codes should ideally be unique for this model.'
          }
          return true
        }).warning('Duplicate component codes found. Check if this is intended.'),
    }),

    // --- Configurator Setup Group ---
    defineField({
      name: 'configuratorSetup',
      title: '360 Configurator Core Setup',
      type: 'configuratorSetup',
      group: 'configurator',
      description:
        'REQUIRED technical settings for the 360° image sequence: frame count & available color slugs. This data MUST match the assets in storage.',
      validation: (Rule) =>
        Rule.required().error('Configurator Setup is required for the 3D view.'),
    }),

    // --- Pricing Group ---
    defineField({
      name: 'pricingRules',
      title: 'State Pricing',
      type: 'array',
      group: 'pricing',
      of: [{type: 'pricingRule'}],
      description:
        'Define base Ex-Showroom price and required fees per state. Ensure all target states are covered. States must be unique.',
      validation: (Rule) => [
        Rule.required().min(1).error('At least one pricing rule is required.'),
        Rule.unique().error('Each state can only have one pricing rule for this model.'),
      ],
    }),

    // --- Linked Marketing Pages Group ---
    defineField({
      name: 'linkedProductPages',
      title: 'Linked Product Marketing Pages',
      type: 'array',
      group: 'pageContent',
      description:
        'Shows which Product Pages use this Vehicle Model data (auto-populated, read-only).',
      of: [
        {
          type: 'reference',
          to: [{type: 'productPage'}],
          options: {
            filter: ({document}) => {
              const docId = (document as any)?._id
              if (!docId) {
                return {filter: '_id == "____NON_EXISTENT____"'}
              }
              return {filter: `relatedVehicle._ref == $docId`, params: {docId}}
            },
          },
        },
      ],
      readOnly: true,
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings (Fallback)',
      type: 'seoSettings',
      group: 'seo',
      description:
        'Configure search engine appearance IF this model gets a dedicated page (e.g., /vehicles/km3000). Usually, SEO is managed by the primary Product Page linked above.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'modelCode.current',
      media: 'image',
      isBookable: 'isBookable',
    },
    prepare({
      title,
      code,
      media,
      isBookable,
    }: {
      title?: string
      code?: string
      media?: any
      isBookable?: boolean
    }) {
      const subtitle = `${code ? `(${code})` : ''}${isBookable === false ? ' (Not Bookable)' : ''}`
      return {
        title: `${title || 'Untitled Model'}`,
        subtitle: subtitle.trim() || 'Vehicle Model',
        media: media || RocketIcon,
      }
    },
  },
})

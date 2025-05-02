import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons' // Example Icon

export default defineType({
  name: 'vehicleModel',
  title: 'Vehicle Model',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'variants', title: 'Variants'},
    {name: 'colors', title: 'Colors'},
    {name: 'components', title: 'Options & Add-ons'}, // Renamed group
    {name: 'pricing', title: 'Pricing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Details Group
    defineField({
      name: 'name',
      title: 'Model Name',
      type: 'string',
      group: 'details',
      description: 'The official name of the vehicle model (e.g., KM3000 Mark 2).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelCode',
      title: 'Model Code',
      type: 'slug',
      group: 'details',
      description: 'A short, unique code for the model (e.g., B10, H10).',
      options: {
        source: 'name', // Generate from name
        maxLength: 10,
         slugify: (input) => input.toUpperCase().replace(/[^A-Z0-9]/g, ''), // Simple code gen
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
       options: {
        source: 'name',
        maxLength: 96,
      },
      group: 'details',
      description: 'URL-friendly identifier generated from the model name.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'A brief marketing description or tagline for the model.',
    }),
    defineField({
      name: 'image', // Changed from imageUrl
      title: 'Primary Image',
      type: 'image',
      group: 'details',
      description: 'Upload the main promotional image for this model.',
      options: {
        hotspot: true,
      },
       validation: (Rule) => Rule.required(),
    }),

    // Variants Group
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      group: 'variants',
      description: 'Define the different versions available (e.g., based on range, battery).',
      of: [{type: 'variant'}],
      validation: (Rule) => Rule.min(1).error('At least one variant must be defined.'),
    }),

    // Colors Group
    defineField({
      name: 'colors',
      title: 'Color Options',
      type: 'array',
      group: 'colors',
      description: 'Define the color choices available for this model.',
      of: [{type: 'colorOption'}],
       validation: (Rule) => Rule.min(1).error('At least one color option must be defined.'),
    }),

    // Components/Packages Group
    defineField({
      name: 'components',
      title: 'Applicable Components/Packages/Services',
      type: 'array',
      group: 'components',
      description: 'List all accessories, packages, warranties, or services available for this model.',
      of: [{type: 'componentOption'}],
    }),

    // Pricing Group
     defineField({
      name: 'pricingRules',
      title: 'State Pricing',
      type: 'array',
      group: 'pricing',
      of: [{type: 'pricingRule'}],
      description: 'Define base price and fees per state. Ensure all target states are covered.',
       validation: (Rule) => Rule.min(1).error('At least one pricing rule is required.'),
    }),

    // SEO Group
     defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for the model page.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'modelCode.current',
      media: 'image', // Use image field
    },
     prepare({title, code, media}) {
      const subtitle = code ? `(${code})` : ''
      return {
        title: `${title || 'Untitled Model'} ${subtitle}`,
        media: media || RocketIcon,
      }
    },
  },
})
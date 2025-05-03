import {defineType, defineField} from 'sanity'
import {CubeIcon} from '@sanity/icons' // Changed Icon

export default defineType({
  name: 'bookingVehicle', // Renamed
  title: 'Booking Vehicle', // Renamed
  type: 'document',
  icon: CubeIcon, // Changed Icon
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'variants', title: 'Variants'},
    {name: 'colors', title: 'Colors'},
    {name: 'components', title: 'Options & Add-ons'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'pageContent', title: 'Page Content'}, // New Group for Page Builder
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
        source: 'name',
        maxLength: 10,
        slugify: (input) => input.toUpperCase().replace(/[^A-Z0-9]/g, ''),
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
      description: 'URL-friendly identifier for the vehicle page (/vehicles/[slug]).',
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
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      group: 'details',
      description: 'Upload the main promotional image for this model.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text field to image
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility. Describe the vehicle model shown.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
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
      description:
        'List all accessories, packages, warranties, or services available for this model.',
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

    // Page Content Group (Optional Page Builder)
    defineField({
      name: 'pageContent',
      title: 'Additional Page Content',
      type: 'array',
      group: 'pageContent',
      description:
        'Optional: Add more content sections to the vehicle page beyond basic specs (e.g., feature highlights, videos).',
      of: [
        {type: 'blockContent', title: 'Text Block'},
        {type: 'featureCarousel', title: 'Feature Carousel'},
        {type: 'techSpecsSection', title: 'Tech Specs Block'},
        {type: 'videoSection', title: 'Video Block'},
        {type: 'testimonialSection', title: 'Testimonials Block'},
        {type: 'ctaBlock', title: 'Call to Action Block'},
        {type: 'textWithImageBlock', title: 'Text w/ Image Block'},
        // Add other relevant modular block types here
      ],
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Use the enhanced SEO object
      group: 'seo',
      description: 'Configure search engine appearance for the vehicle page.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'modelCode.current',
      media: 'image',
    },
    prepare({title, code, media}) {
      const subtitle = code ? `(${code})` : ''
      return {
        title: `${title || 'Untitled Vehicle'} ${subtitle}`,
        media: media || CubeIcon,
      }
    },
  },
})

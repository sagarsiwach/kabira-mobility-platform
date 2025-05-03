// schema/documents/productPage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon, HelpCircleIcon} from '@sanity/icons' // Add HelpCircleIcon

export default defineType({
  name: 'productPage',
  title: 'Product Page (Marketing)', // Clarified Title
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'content', title: 'Page Content Sections'},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    // General Information
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'general',
      description:
        'The main title for this product marketing page (e.g., "KM4000 - The Silent Warrior").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      description:
        'URL for this specific product page (e.g., /km4000). Should match the related vehicle model slug.',
      options: {
        source: 'title',
        maxLength: 96,
        // Potential enhancement: Add a custom validation to ensure uniqueness
        // or suggest matching the related bookingVehicle slug if one is linked.
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // **** Link to the core vehicle data ****
      name: 'relatedVehicle',
      title: 'Related Booking Vehicle',
      type: 'reference',
      group: 'general',
      description:
        'Link this marketing page to the corresponding vehicle defined in "Booking Vehicles". This connects pricing, variants etc.',
      to: [{type: 'bookingVehicle'}],
      // Make this required if every product page MUST correspond to a booking vehicle
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      group: 'general',
      description: 'Whether this product marketing page should be publicly visible.',
      initialValue: true,
    }),

    // Page Content Sections (Using Page Builder approach)
    defineField({
      name: 'pageBuilder',
      title: 'Page Content Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange content blocks like Hero, Features, Specs, Videos, etc.',
      of: [
        // Define the specific block types allowed ON PRODUCT PAGES
        {type: 'heroSection', title: 'Hero Section'},
        {type: 'featureCarousel', title: 'Feature Carousel'},
        {type: 'techSpecsSection', title: 'Tech Specs Section'}, // You might fetch specs from relatedVehicle, or define overrides here
        {type: 'videoSection', title: 'Video Section'},
        {type: 'testimonialSection', title: 'Testimonial Section'},
        {type: 'configuratorData', title: '3D Configurator Embed'}, // Keeping this
        {type: 'blockContent', title: 'Text Block'}, // For general text sections
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        // Potentially a dedicated FAQ section object or reference FAQs
        // Example: Referencing FAQs (ensure faqItem schema exists)
        {
          type: 'object',
          name: 'productFaqs',
          title: 'FAQ Section (Product Specific)',
          icon: HelpCircleIcon, // Need to import this icon if used
          fields: [
            defineField({
              name: 'titleOverride',
              title: 'FAQ Section Title Override',
              type: 'string',
              description: 'Optional title like "KM4000 FAQs"',
            }),
            defineField({
              name: 'referencedFaqs',
              title: 'Select FAQs',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'faqItem'}]}],
              validation: (Rule) => Rule.unique(),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Product page must have at least one content section.'),
    }),

    // SEO & Metadata
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      type: 'seoSettings',
      description: 'Search engine optimization settings for this product page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      vehicleName: 'relatedVehicle.name', // Get name from linked vehicle
      media: 'pageBuilder.0.image', // Try to get hero image from first block (adjust path if needed)
    },
    prepare({title, active, vehicleName, media}) {
      const subtitle = vehicleName
        ? `Marketing page for: ${vehicleName}`
        : active
          ? 'Status: Active'
          : 'Status: Inactive'
      return {
        title: title || 'Untitled Product Page',
        subtitle: subtitle,
        media: media || RocketIcon, // Fallback icon
      }
    },
  },
})
// Import HelpCircleIcon if using the FAQ reference block:
// import {HelpCircleIcon} from '@sanity/icons'

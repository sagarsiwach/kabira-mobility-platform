// schema/documents/productPage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon, HelpCircleIcon, ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'productPage',
  title: 'Product Page (Marketing)',
  type: 'document',
  icon: RocketIcon,
  groups: [
    // ... groups ...
  ],
  fields: [
    // ... fields ...
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedVehicle',
      title: 'Related Booking Vehicle',
      type: 'reference',
      group: 'general',
      description:
        'Link this marketing page to the corresponding vehicle defined in "Booking Vehicles".',
      to: [{type: 'bookingVehicle'}],
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
    defineField({
      name: 'pageBuilder',
      title: 'Page Content Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange content blocks like Hero, Features, Specs, Videos, etc.',
      of: [
        {type: 'heroSection', title: 'Hero Section'},
        {type: 'featureCarousel', title: 'Feature Carousel'},
        {type: 'techSpecsSection', title: 'Tech Specs Section'},
        {type: 'videoSection', title: 'Video Section'},
        {type: 'testimonialSection', title: 'Testimonial Section'},
        {type: 'gallerySection', title: 'Gallery Section', icon: ImagesIcon},
        {type: 'configuratorData', title: '3D Configurator Embed'},
        {
          type: 'object',
          name: 'productFaqs',
          title: 'FAQ Section (Product Specific)',
          icon: HelpCircleIcon,
          fields: [
            defineField({
              name: 'titleOverride',
              title: 'FAQ Section Title Override',
              type: 'string',
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
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      type: 'seoSettings',
      description: 'Search engine optimization settings for this product page.',
    }),
  ],
  preview: {
    // TEMPORARILY SIMPLIFY SELECT
    select: {
      title: 'title',
      active: 'active',
      vehicleName: 'relatedVehicle.name',
      // pageBuilder: 'pageBuilder', // Temporarily comment out pageBuilder selection
    },
    // Update prepare to match the simplified select
    prepare({title, active, vehicleName /* Remove pageBuilder */}) {
      const subtitle = vehicleName
        ? `Marketing page for: ${vehicleName}`
        : active
          ? 'Status: Active'
          : 'Status: Inactive'

      return {
        title: title || 'Untitled Product Page',
        subtitle: subtitle,
        media: RocketIcon, // Just use the fallback icon for now
      }
    },
  },
})

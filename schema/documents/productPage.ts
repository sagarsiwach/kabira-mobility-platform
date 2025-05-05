// schema/documents/productPage.ts (MODIFIED)
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons' // Changed icon to distinguish from vehicle

export default defineType({
  name: 'productPage',
  title: 'Product Marketing Page',
  type: 'document',
  icon: RocketIcon, // Use a distinct icon like LaunchIcon or ControlsIcon maybe?
  groups: [
    {name: 'content', title: 'Page Content', default: true},
    {name: 'vehicleLink', title: 'Linked Vehicle'}, // New group
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Marketing)',
      type: 'string',
      group: 'content',
      description:
        'The primary H1 title displayed on this marketing page (e.g., "Experience the All-New KM4000").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      group: 'content',
      description: 'URL for this specific page (e.g., /products/{slug}). MUST be unique.',
      options: {source: 'title', maxLength: 96 /* ... isUnique check ... */},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Link to the *single* source of truth vehicle document
      name: 'vehicle',
      title: 'Vehicle Data Source',
      type: 'reference',
      description:
        'REQUIRED: Select the Vehicle this marketing page is for. Data like specs, colors, configurator setup will be pulled from the linked Vehicle.',
      to: [{type: 'vehicle'}], // POINTS TO NEW VEHICLE TYPE
      group: 'vehicleLink',
      validation: (Rule) =>
        Rule.required().error('Each Product Page must be linked to a Vehicle document.'),
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
      description: 'Build the page by adding and arranging content sections:',
      of: [
        {type: 'heroSection', title: '1. Hero Section'},
        {type: 'turntableSection', title: '2. 360 Turntable'}, // Ensure this uses vehicle.configuratorSetup data
        {type: 'featureCarousel', title: '3. Feature Carousel'},
        {type: 'gallerySection', title: '4. Image Gallery'}, // Consider if this should pull from vehicle.vehicleGallery or be separate
        {type: 'techSpecsSection', title: '5. Tech Specs'}, // Ensure this can filter by vehicle.variants
        {type: 'productFaqs', title: '6. Product FAQ Block'},
        {type: 'testimonialSection', title: '7. Testimonials Block'},
        {type: 'videoSection', title: '8. Video Block'},
        // Additional optional sections
        {type: 'blockContent', title: 'Text Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'downloadList', title: 'Download List'},
        // REMOVED configuratorData block - use turntableSection linked to vehicle.configuratorSetup
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings (Primary)',
      group: 'seo',
      type: 'seoSettings',
      description:
        'Primary SEO settings for this product marketing page. Overrides vehicle default SEO.',
      validation: (Rule) => Rule.required(), // Make SEO required for product pages
    }),
  ],
  preview: {
    select: {
      pageTitle: 'title', // Use page title
      vehicleName: 'vehicle.name', // Get name from linked vehicle
      media: 'heroSection.image', // Example media source
      active: 'active',
      slug: 'slug.current',
    },
    prepare({pageTitle, vehicleName, media, active, slug}) {
      const title = pageTitle || vehicleName || 'Untitled Product Page'
      const subtitle = `${vehicleName ? `Marketing page for ${vehicleName}` : ''}${active === false ? ' (Inactive)' : ''}${slug ? ` (/${slug})` : ''}`
      return {
        title: title,
        subtitle: subtitle.trim(),
        media: media || RocketIcon,
      }
    },
  },
})

// schema/singletons/homePage.ts (CORRECTED)
import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero Section', default: true},
    {name: 'content', title: 'Page Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference in the CMS.',
      initialValue: 'Home Page',
      readOnly: true,
      // group: 'hero', // No need to group this internal title
    }),

    // Hero Section Group
    defineField({
      name: 'hero',
      title: 'Hero Section Content',
      type: 'heroSection', // Use the reusable heroSection object
      group: 'hero',
      description: 'Configure the main hero banner for the homepage.',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),

    // Content Group (Page Builder)
    defineField({
      name: 'featuredVehiclesTitle',
      title: 'Featured Vehicles Section Title',
      type: 'string',
      group: 'content',
      initialValue: 'Explore Our Range',
    }),
    defineField({
      name: 'featuredVehicles',
      title: 'Featured Vehicles',
      type: 'array',
      group: 'content',
      description: 'Select vehicle models to feature on the homepage.',
      of: [
        // --- FIX HERE ---
        {type: 'reference', to: [{type: 'vehicle'}]}, // Reference the consolidated 'vehicle' type
      ],
      validation: (Rule) => Rule.unique().max(4).warning('Suggest featuring 3-4 vehicles.'),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Additional Content Sections',
      type: 'array',
      group: 'content',
      description: 'Add more content blocks below the featured vehicles.',
      of: [
        {type: 'blockContent', title: 'Text Block'},
        {type: 'featureCarousel', title: 'Feature Carousel'},
        {type: 'videoSection', title: 'Video Block'},
        {type: 'testimonialSection', title: 'Testimonials Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        // Add other relevant block types like gallerySection, downloadList etc.
        {type: 'gallerySection', title: 'Image Gallery'},
        {type: 'downloadList', title: 'Download List'},
        {type: 'faqBlock', title: 'FAQ Block'},
      ],
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for the Home Page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Home Page',
      }
    },
  },
})

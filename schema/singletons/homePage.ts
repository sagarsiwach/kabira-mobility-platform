// schema/singletons/homePage.ts
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
    }),

    // Hero Section Group
    defineField({
      name: 'hero',
      title: 'Hero Section Content',
      type: 'heroSectionBlock', // CHANGED FROM 'heroSection'
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
      of: [{type: 'reference', to: [{type: 'vehicle'}]}],
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
        {type: 'videoSection', title: 'Video Block'},
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'faqBlock', title: 'FAQ Block'},
        // Removed unknown types: featureCarousel, testimonialSection, gallerySection, downloadList
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

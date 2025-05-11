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
    defineField({
      name: 'hero',
      title: 'Hero Section Content',
      type: 'heroSectionBlock',
      group: 'hero',
      description: 'Configure the main hero banner for the homepage.',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
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
      initialValue: [],
      description: 'Select vehicle models to feature on the homepage.',
      of: [{type: 'reference', to: [{type: 'vehicle'}]}],
      validation: (Rule) => Rule.unique().max(4).warning('Suggest featuring 3-4 vehicles.'),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Additional Content Sections',
      type: 'array',
      group: 'content',
      initialValue: [],
      description: 'Add more content blocks below the featured vehicles.',
      of: [
        {type: 'blockContent', title: 'Text Block'},
        {type: 'videoBlock', title: 'Featured Video Block'},
        {type: 'galleryBlock', title: 'Image Gallery Block'}, // <<< ADDED
        {type: 'ctaBlock', title: 'Call to Action'},
        {type: 'textWithImageBlock', title: 'Text w/ Image'},
        {type: 'faqBlock', title: 'FAQ Block'},
        // {type: 'featureCarouselBlock', title: 'Feature Carousel'}, // Add if needed for home page
      ],
    }),
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

import {defineField, defineType} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons'

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'object',
  icon: TrendUpwardIcon,
  description: 'Optimize how this page appears in search engine results.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Crucial for SEO. Aim for 50-60 characters. If empty, the page title will be used.',
      validation: (Rule) => Rule.max(70).warning('Title may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Compelling summary for search results. Aim for 150-160 characters.',
      validation: (Rule) =>
        Rule.max(170).warning('Description may be truncated in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      description:
        'Image used when sharing on social media (e.g., Facebook, Twitter). Recommended size: 1200x630 pixels.',
      options: {
        hotspot: true, // Allows focusing the important part of the image
      },
    }),
    // You could add more fields like keywords (though less important now), canonical URL, etc.
  ],
})
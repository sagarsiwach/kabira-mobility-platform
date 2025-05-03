// schema/objects/seoSettings.ts
import {defineField, defineType} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons'

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'object',
  icon: TrendUpwardIcon,
  description: 'Optimize how this content appears in search engine results and social media.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Crucial for SEO. Aim for 50-60 characters. If empty, the page/document title might be used as a fallback.',
      validation: (Rule) => Rule.max(70).warning('Title may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Compelling summary for search results. Aim for 150-160 characters. If empty, an excerpt or the start of the body text might be used as a fallback.',
      validation: (Rule) =>
        Rule.max(170).warning('Description may be truncated in search results.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string', // Changed to string for comma-separated
      description:
        'Optional: Comma-separated keywords relevant to the content. Less impactful for SEO now, but can be useful internally.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      description:
        'Image used when sharing on social media (e.g., Facebook, Twitter). Recommended size: 1200x630 pixels. If empty, the main image or a default site image might be used.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and social platforms.',
          isHighlighted: true,
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Discourage Search Indexing',
      type: 'boolean',
      description:
        'Set to true to add a "noindex" meta tag, suggesting search engines not to index this page. Use with caution.',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'Discourage Link Following',
      type: 'boolean',
      description:
        'Set to true to add a "nofollow" meta tag, suggesting search engines not to follow links on this page.',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (Advanced)',
      type: 'url',
      description:
        'Optional: Specify the preferred URL if this content exists at multiple URLs. Leave empty for default behavior.',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true, // Start collapsed to save space
  },
})

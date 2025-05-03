// schema/singletons/siteSettings.ts
import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'seo', title: 'Default SEO'},
    {name: 'social', title: 'Social Media'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    // General Group
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'The official name of the website, used in meta tags and potentially elsewhere.',
      initialValue: 'Kabira Mobility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactDefaults',
      title: 'Default Contact Info',
      type: 'contact', // Reuse contact object
      group: 'general',
      description: 'Default phone/email/website for use in footer or contact sections.',
    }),

    // Default SEO Group
    defineField({
      name: 'fallbackSeo',
      title: 'Default SEO / Fallback Settings',
      type: 'seoSettings',
      group: 'seo',
      description:
        'These settings are used if a specific page does not have its own SEO configured.',
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Default Social Share Image',
      type: 'image',
      group: 'seo',
      description:
        "Fallback image used for social sharing if a page-specific one isn't set (1200x630 recommended).",
      options: {hotspot: true},
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'e.g., "Kabira Mobility Logo"',
          isHighlighted: true,
        }),
      ],
    }),

    // Social Media Group
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      description: 'Links to official social media profiles.',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'Other'],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
        },
      ],
    }),

    // Footer Group
    defineField({
      name: 'globalFooterText',
      title: 'Global Footer Text',
      type: 'blockContent', // Use rich text for potential formatting/links
      group: 'footer',
      description: 'Text displayed in the website footer (e.g., copyright notice).',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})

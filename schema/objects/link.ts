// schema/objects/link.ts (Simplified Version - REPLACE content)
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'External URL', value: 'external'},
          {title: 'Internal Path', value: 'path'}, // Renamed for clarity
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'path',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'The full URL for external websites (e.g., "https://example.com").',
      hidden: ({parent}) => (parent as any)?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.linkType === 'external') {
            if (!value) return 'An external URL is required.'
            // Apply URI validation only if it's an external link AND has a value
            try {
              Rule.uri({
                scheme: ['http', 'https'],
                allowRelative: false,
              })(value)
              return true // Validation passes
            } catch (err: any) {
              return err.message // Return validation error message
            }
          }
          return true // Pass validation if not external or no value yet
        }),
    }),
    defineField({
      name: 'path',
      title: 'Internal Path',
      type: 'string',
      description:
        'Enter the relative path for internal pages (e.g., "/book", "/dealers", "/products/km4000"). MUST start with a forward slash "/".',
      hidden: ({parent}) => (parent as any)?.linkType !== 'path',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.linkType === 'path') {
            if (!value) return 'An internal path is required.'
            if (!value.startsWith('/')) return 'Path must start with a forward slash ("/").'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      externalUrl: 'externalUrl',
      path: 'path',
    },
    prepare({linkType, externalUrl, path}) {
      let title = 'Link'
      let subtitle = 'Not configured'

      if (linkType === 'external') {
        title = `🔗 External`
        subtitle = externalUrl || 'No URL'
      } else if (linkType === 'path') {
        title = `🔗 Internal Path`
        subtitle = path || 'No Path'
      }
      return {title, subtitle}
    },
  },
})

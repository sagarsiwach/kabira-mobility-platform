// schema/objects/link.ts
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

// Add all relevant document types that can be linked internally
const internalLinkTypes = [
  'bookingVehicle',
  'post',
  'category',
  'legalPage',
  'genericPage',
  'pressRelease',
  'faqCategory',
  'author', // Added Author
  // Add other types like 'dealer' if you need to link to them directly
]

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
          {title: 'Internal Page/Document', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Simple Path', value: 'path'}, // For fixed paths like /book, /dealers
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalReference',
      title: 'Internal Link Target',
      type: 'reference',
      description:
        "Link to another document within Sanity. The URL will be generated based on the linked document's slug.",
      to: internalLinkTypes.map((type) => ({type})),
      hidden: ({parent}) => (parent as any)?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.linkType === 'internal' && !value) {
            return 'An internal link target is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'The full URL for external websites (e.g., "https://example.com").',
      hidden: ({parent}) => (parent as any)?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.linkType === 'external' && !value) {
            return 'An external URL is required.'
          }
          return true
        }).uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
    defineField({
      name: 'path',
      title: 'Simple Path',
      type: 'string',
      description:
        'Use for simple, fixed paths like "/book", "/dealers", "/contact". Start with a forward slash "/".',
      hidden: ({parent}) => (parent as any)?.linkType !== 'path',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.linkType === 'path') {
            if (!value) return 'A path is required.'
            if (!value.startsWith('/')) return 'Path must start with a forward slash ("/").'
          }
          return true
        }),
    }),
    defineField({
      name: 'labelOverride',
      title: 'Label Override (Optional)',
      type: 'string',
      description:
        'If linking internally, you can override the automatically generated label (e.g., the document title) with this text.',
      hidden: ({parent}) => (parent as any)?.linkType !== 'internal',
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      internalTitle: 'internalReference.title', // Common title field
      internalName: 'internalReference.name', // Name field (e.g., for bookingVehicle, author)
      internalSlug: 'internalReference.slug.current',
      externalUrl: 'externalUrl',
      path: 'path',
      labelOverride: 'labelOverride',
    },
    prepare({
      linkType,
      internalTitle,
      internalName,
      internalSlug,
      externalUrl,
      path,
      labelOverride,
    }) {
      let title = 'Link (Not configured)'
      let subtitle = ''

      if (linkType === 'internal') {
        const displayTitle = labelOverride || internalName || internalTitle || 'Linked Document'
        title = `🔗 Internal: ${displayTitle}`
        subtitle = internalSlug ? `Slug: /${internalSlug}` : 'No slug found on linked item'
      } else if (linkType === 'external') {
        title = `🔗 External: ${externalUrl || 'No URL'}`
        subtitle = externalUrl || ''
      } else if (linkType === 'path') {
        title = `🔗 Path: ${path || 'No Path'}`
        subtitle = path || ''
      }
      return {title, subtitle}
    },
  },
})

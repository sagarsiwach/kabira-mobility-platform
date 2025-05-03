// schema/objects/moreDropdownItem.ts
import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export default defineType({
  name: 'moreDropdownItem', // Correct name
  title: 'More Dropdown Item',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The text displayed for the link (e.g., "About Us", "Blog").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Uses the reusable link object
      description: 'Where this link should navigate to.',
      validation: (Rule) =>
        Rule.custom((value) => {
          // Basic check to ensure the link object itself is defined and has a type
          if (!(value as any)?._type || !(value as any)?.linkType) {
            return 'A link destination is required and must be configured.'
          }
          // You could add more specific checks here if needed, similar to navMenuItem
          const linkValue = value as any
          if (linkValue.linkType === 'internal' && !linkValue.internalReference?._ref) {
            return 'Internal Link Target is missing.'
          }
          if (linkValue.linkType === 'external' && !linkValue.externalUrl) {
            return 'External URL is missing.'
          }
          if (linkValue.linkType === 'path' && !linkValue.path) {
            return 'Simple Path is missing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'group',
      title: 'Display Group/Column',
      type: 'number',
      description:
        'Group number for column layout (e.g., 1, 2). Links with the same number appear in the same column.',
      options: {
        list: [1, 2, 3], // Adjust max groups if needed
      },
      validation: (Rule) =>
        Rule.required().integer().min(1).warning('Use group numbers to control layout.'),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      group: 'group',
      linkType: 'link.linkType', // Access nested field from the link object
    },
    prepare({label, group, linkType}) {
      const title = label || 'Untitled More Link'
      const subtitle = `Group ${group || '?'} | Type: ${linkType || 'Not Set'}`
      return {title, subtitle}
    },
  },
})

// schema/objects/moreDropdownItem.ts
import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export default defineType({
  name: 'moreDropdownItem',
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
      type: 'link',
      description: 'Where this link should navigate to.',
      validation: (Rule) =>
        Rule.custom((value) => {
           // Corrected: Check value structure
          if (!(value as any)?._type) {
            return 'A link destination is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'group',
      title: 'Display Group/Column',
      type: 'number',
      description: 'Group number for column layout (e.g., 1, 2). Links with the same number appear in the same column.',
      options: {
          list: [1, 2, 3],
      },
      validation: (Rule) => Rule.required().integer().min(1).warning('Use group numbers to control layout.'),
    }),
  ],
   preview: {
    select: {
      label: 'label',
      group: 'group',
      linkType: 'link.linkType',
    },
    prepare({label, group, linkType}) {
        const title = label || 'Untitled More Link'
        const subtitle = `Group ${group || '?'} | Type: ${linkType || 'Not Set'}`
      return { title, subtitle }
    },
  },
})
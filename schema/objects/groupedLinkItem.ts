// schema/objects/groupedLinkItem.ts
import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export default defineType({
  name: 'groupedLinkItem',
  title: 'Grouped Link Item',
  type: 'object',
  icon: StackCompactIcon,
  description: 'A link item belonging to a specific display group (for column layouts).',
  fields: [
    defineField({
        name: 'title', // Explicit title field is better than reusing link override
        title: 'Display Title',
        type: 'string',
        description: 'The text displayed for the link (e.g., "About Us", "Blog").',
        validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Use the reusable link object
      description: 'Where this link should navigate to.',
      validation: (Rule) => Rule.required().error('A link destination must be configured.'),
    }),
    defineField({
      name: 'group',
      title: 'Display Group/Column',
      type: 'number',
      description: 'Group number (e.g., 1, 2). Links with the same number appear together.',
      options: { list: [1, 2, 3] }, // Example groups
      validation: (Rule) => Rule.required().integer().min(1).error('Group number is required.'),
    }),
  ],
   preview: {
    select: {
      title: 'title', // Use explicit title
      group: 'group',
      linkType: 'link.linkType',
    },
    prepare({title, group, linkType}) {
        const subtitle = `Group ${group || '?'} | Type: ${linkType || 'Not Set'}`
      return { title: title || 'Untitled Grouped Link', subtitle }
    },
  },
})
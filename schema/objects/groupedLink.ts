// schema/objects/groupedLink.ts
import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export default defineType({
  name: 'groupedLink',
  title: 'Grouped Link (for More Dropdown)',
  type: 'object',
  icon: StackCompactIcon,
  description: 'A link item belonging to a specific display group (for column layouts).',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'The text displayed for the link (e.g., "About Us", "Blog").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Use the *simplified* link object (external/path only)
      description: 'Where this link should navigate to.',
      validation: (Rule) => Rule.required().error('A link destination must be configured.'),
    }),
    defineField({
      name: 'group',
      title: 'Display Group/Column',
      type: 'number',
      description: 'Group number (e.g., 1, 2). Links with the same number appear together.',
      options: {list: [1, 2, 3, 4]}, // Allow up to 4 groups/columns
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(1).error('Group number is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      group: 'group',
      linkType: 'link.linkType',
      path: 'link.path',
      url: 'link.externalUrl',
    },
    prepare({title, group, linkType, path, url}) {
      let subtitle = `Group ${group || '?'} | Type: ${linkType || 'Not Set'}`
      if (linkType === 'path') subtitle += ` | Path: ${path || 'None'}`
      if (linkType === 'external') subtitle += ` | URL: ${url || 'None'}`
      return {title: title || 'Untitled Grouped Link', subtitle}
    },
  },
})

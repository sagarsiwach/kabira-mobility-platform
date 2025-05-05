// schema/objects/basicNavItem.ts
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons' // Reusing icon

// Ensure this 'export default' is present and correct
export default defineType({
  name: 'basicNavItem',
  title: 'Basic Navigation Item',
  type: 'object',
  icon: LinkIcon,
  description: 'A simple navigation item with a display title and a link destination.',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'The text displayed for this link (e.g., "Motorbikes", "Dealers").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Use the *simplified* link object (external/path only)
      validation: (Rule) => Rule.required().error('A link destination must be configured.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkType: 'link.linkType',
      path: 'link.path',
      url: 'link.externalUrl',
    },
    prepare({title, linkType, path, url}) {
      let subtitle = `Type: ${linkType || 'Not Set'}`
      if (linkType === 'path') subtitle += ` | Path: ${path || 'None'}`
      if (linkType === 'external') subtitle += ` | URL: ${url || 'None'}`
      return {
        title: title || 'Untitled Nav Item',
        subtitle: subtitle,
      }
    },
  },
})

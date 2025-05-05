// schema/objects/vehicleDropdownLink.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'vehicleDropdownLink',
  title: 'Vehicle Dropdown Link',
  type: 'object',
  icon: RocketIcon,
  description: 'A link item for the vehicle dropdowns (Motorbikes, Scooters).',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'The name displayed (e.g., "KM4000", "Book a Test Ride").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Uses the *simplified* link object (external/path only)
      validation: (Rule) => Rule.required().error('A link destination must be configured.'),
    }),
    defineField({
      name: 'image',
      title: 'Image (Optional)',
      type: 'image',
      description: 'Optional image, primarily for vehicle model links.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility.',
          // Make alt text required *only* if an image is added
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const imageAsset = (context.parent as any)?.image?.asset
              if (imageAsset && !alt) {
                return 'Alternative text is required when an image is provided.'
              }
              return true
            }),
          isHighlighted: true,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      linkType: 'link.linkType',
      path: 'link.path',
      url: 'link.externalUrl',
    },
    prepare({title, media, linkType, path, url}) {
      let subtitle = `Type: ${linkType || 'Not Set'}`
      if (linkType === 'path') subtitle += ` | Path: ${path || 'None'}`
      if (linkType === 'external') subtitle += ` | URL: ${url || 'None'}`
      return {
        title: title || 'Untitled Vehicle Link',
        subtitle: subtitle,
        media: media || RocketIcon,
      }
    },
  },
})

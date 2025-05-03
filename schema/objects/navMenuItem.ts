// schema/objects/navMenuItem.ts
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'navMenuItem',
  title: 'Navigation Menu Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The text displayed for the menu item.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Dropdown Menu', value: 'dropdown'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link Path',
      type: 'string', // Use string for simple paths like /book, /dealers
      description: 'Path relative to the site root (e.g., "/about", "/book").',
      hidden: ({parent}) => parent?.linkType !== 'internal',
      // validation: Rule => Rule.uri({ allowRelative: true, relativeOnly: true }) // Basic path validation
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'The full URL for external links (e.g., "https://blog.example.com").',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'dropdownType',
      title: 'Dropdown Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Motorbikes', value: 'motorbikes'},
          {title: 'Scooters', value: 'scooters'},
          {title: 'More Links', value: 'more'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.linkType !== 'dropdown',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Require dropdownType if linkType is dropdown
          if (context.parent?.linkType === 'dropdown' && !value) {
            return 'Dropdown type is required when Link Type is Dropdown.'
          }
          return true
        }),
    }),
    // Field to hold the *actual* dropdown items, defined inline
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Items',
      type: 'array',
      hidden: ({parent}) => parent?.linkType !== 'dropdown',
      description: 'Items to show within this dropdown menu.',
      of: [
        // Define different object types based on dropdownType
        // Type for Motorbike/Scooter links (referencing VehicleModel)
        {
          name: 'dropdownModelItem',
          title: 'Model Link',
          type: 'object',
          // Conditionally show this type based on parent's dropdownType
          hidden: ({parent}) =>
            parent?.dropdownType !== 'motorbikes' && parent?.dropdownType !== 'scooters',
          fields: [
            defineField({
              name: 'model',
              title: 'Vehicle Model',
              type: 'reference',
              to: [{type: 'vehicleModel'}],
              description: 'Select the vehicle model this item links to.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'overrideLabel',
              title: 'Override Label (Optional)',
              type: 'string',
              description: 'If blank, the Model Name will be used.',
            }),
            // We might derive the URL from the model's slug on the frontend
            // Or add an explicit URL field if needed
          ],
          preview: {
            select: {
              modelName: 'model.name',
              overrideLabel: 'overrideLabel',
              media: 'model.image',
            },
            prepare({modelName, overrideLabel, media}) {
              return {
                title: overrideLabel || modelName || 'Unnamed Model',
                subtitle: 'Model Link',
                media: media,
              }
            },
          },
        },
        // Type for simple links within Motorbike/Scooter dropdowns
        {
          name: 'dropdownLinkItem',
          title: 'Simple Link',
          type: 'object',
           hidden: ({parent}) =>
             parent?.dropdownType !== 'motorbikes' && parent?.dropdownType !== 'scooters',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'url', // Or string for internal paths
              validation: (Rule) => Rule.required(),
            }),
          ],
           preview: { select: { title: 'label', subtitle: 'url' } }
        },
        // Type for "More" links (requires group number)
        {
          name: 'dropdownMoreLinkItem',
          title: 'More Link Item',
          type: 'object',
          hidden: ({parent}) => parent?.dropdownType !== 'more',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'url', // Or string
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'group',
              title: 'Display Group',
              type: 'number',
              description: 'Group number for column layout (e.g., 1, 2).',
              validation: (Rule) => Rule.required().integer().min(1),
            }),
          ],
           preview: {
             select: { title: 'label', subtitle: 'url', group: 'group' },
             prepare({ title, subtitle, group }) {
               return { title, subtitle: `Group ${group}: ${subtitle}` }
             }
           }
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      dropdownType: 'dropdownType',
    },
    prepare({title, linkType, dropdownType}) {
      let subtitle = linkType
      if (linkType === 'dropdown') {
        subtitle = `Dropdown (${dropdownType || '?'})`
      }
      return {
        title: title || 'Untitled Item',
        subtitle: subtitle,
      }
    },
  },
})
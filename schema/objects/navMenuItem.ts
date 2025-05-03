// schema/objects/navMenuItem.ts
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'navMenuItem',
  title: 'Top-Level Navigation Item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description:
        'The text displayed for this top-level menu item (e.g., "Motorbike", "Dealers").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      options: {
        list: [
          {title: 'Direct Link', value: 'link'},
          {title: 'Dropdown Menu', value: 'dropdown'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'link',
      validation: (Rule) => Rule.required(),
    }),
    // --- Field for 'link' type ---
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Uses the reusable link object
      description: 'Define where this item links to if it\'s a "Direct Link".',
      hidden: ({parent}) => (parent as any)?.itemType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any // Explicit type assertion
          if (parent?.itemType === 'link') {
            // Check if the nested link object has its core properties defined
            const linkValue = value as any // Use type assertion
            if (!linkValue?._type || !linkValue?.linkType) {
              return 'Link Destination configuration is incomplete.'
            }
            // Check required fields based on the nested linkType
            if (linkValue.linkType === 'internal' && !linkValue.internalReference?._ref) {
              return 'Internal Link Target is missing.'
            }
            if (linkValue.linkType === 'external' && !linkValue.externalUrl) {
              return 'External URL is missing.'
            }
            if (linkValue.linkType === 'path' && !linkValue.path) {
              return 'Simple Path is missing.'
            }
          }
          return true
        }),
    }),
    // --- Fields for 'dropdown' type ---
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
        layout: 'dropdown',
      },
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any // Explicit type assertion
          if (parent?.itemType === 'dropdown' && !value) {
            return 'Dropdown type is required when Item Type is Dropdown.'
          }
          return true
        }),
    }),
    // Separate arrays for each dropdown type for clarity
    defineField({
      name: 'motorbikeItems',
      title: 'Motorbike Dropdown Items',
      type: 'array',
      of: [{type: 'dropdownItem'}], // Reference the dropdownItem object
      hidden: ({parent}) =>
        (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'motorbikes',
      description: 'Add vehicle model links or simple links for the Motorbikes dropdown.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (
            parent?.itemType === 'dropdown' &&
            parent?.dropdownType === 'motorbikes' &&
            (!value || (value as any[]).length === 0) // Check if array is empty
          ) {
            return 'At least one item is required for the Motorbikes dropdown.'
          }
          return true
        }),
    }),
    defineField({
      name: 'scooterItems',
      title: 'Scooter Dropdown Items',
      type: 'array',
      of: [{type: 'dropdownItem'}], // Reference the dropdownItem object
      hidden: ({parent}) =>
        (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'scooters',
      description: 'Add vehicle model links or simple links for the Scooters dropdown.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (
            parent?.itemType === 'dropdown' &&
            parent?.dropdownType === 'scooters' &&
            (!value || (value as any[]).length === 0) // Check if array is empty
          ) {
            return 'At least one item is required for the Scooters dropdown.'
          }
          return true
        }),
    }),
    defineField({
      name: 'moreItems',
      title: 'More Dropdown Items',
      type: 'array',
      of: [{type: 'moreDropdownItem'}], // Reference the moreDropdownItem object
      hidden: ({parent}) =>
        (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'more',
      description: 'Add links organized by group/column number for the "More" dropdown.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (
            parent?.itemType === 'dropdown' &&
            parent?.dropdownType === 'more' &&
            (!value || (value as any[]).length === 0) // Check if array is empty
          ) {
            return 'At least one item is required for the More dropdown.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemType: 'itemType',
      dropdownType: 'dropdownType',
      linkType: 'link.linkType',
    },
    prepare({title, itemType, dropdownType, linkType}) {
      let subtitle =
        itemType === 'link'
          ? `Direct Link (Type: ${linkType || 'Not Set'})`
          : `Dropdown (${dropdownType || '?'})`
      return {
        title: title || 'Untitled Nav Item',
        subtitle: subtitle,
      }
    },
  },
})

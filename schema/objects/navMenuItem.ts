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
      description: 'The text displayed for this top-level menu item (e.g., "Motorbike", "Dealers").',
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
      type: 'link',
      description: 'Define where this item links to if it\'s a "Direct Link".',
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'link',
       validation: (Rule) =>
         Rule.custom((value, context) => {
            // Corrected: Added type assertion for parent and check value structure
           if ((context.parent as any)?.itemType === 'link' && !(value as any)?._type) {
             return 'A link destination is required for "Direct Link" items.'
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
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown',
      validation: (Rule) =>
        Rule.custom((value, context) => {
           // Corrected: Added type assertion for parent
          if ((context.parent as any)?.itemType === 'dropdown' && !value) {
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
      of: [{type: 'dropdownItem'}],
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'motorbikes',
      description: 'Add vehicle model links or simple links for the Motorbikes dropdown.',
       validation: (Rule) =>
         Rule.custom((value, context) => {
            // Corrected: Added type assertion for parent
           const parent = context.parent as any;
           if (parent?.itemType === 'dropdown' && parent?.dropdownType === 'motorbikes' && (!value || value.length === 0)) {
             return 'At least one item is required for the Motorbikes dropdown.'
           }
           return true
         }),
    }),
    defineField({
      name: 'scooterItems',
      title: 'Scooter Dropdown Items',
      type: 'array',
      of: [{type: 'dropdownItem'}],
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'scooters',
      description: 'Add vehicle model links or simple links for the Scooters dropdown.',
      validation: (Rule) =>
         Rule.custom((value, context) => {
            // Corrected: Added type assertion for parent
           const parent = context.parent as any;
           if (parent?.itemType === 'dropdown' && parent?.dropdownType === 'scooters' && (!value || value.length === 0)) {
             return 'At least one item is required for the Scooters dropdown.'
           }
           return true
         }),
    }),
    defineField({
      name: 'moreItems',
      title: 'More Dropdown Items',
      type: 'array',
      of: [{type: 'moreDropdownItem'}],
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown' || (parent as any)?.dropdownType !== 'more',
      description: 'Add links organized by group/column number for the "More" dropdown.',
       validation: (Rule) =>
         Rule.custom((value, context) => {
            // Corrected: Added type assertion for parent
           const parent = context.parent as any;
           if (parent?.itemType === 'dropdown' && parent?.dropdownType === 'more' && (!value || value.length === 0)) {
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
      let subtitle = itemType === 'link' ? `Direct Link (Type: ${linkType || 'Not Set'})` : `Dropdown (${dropdownType || '?'})`
      return {
        title: title || 'Untitled Nav Item',
        subtitle: subtitle,
      }
    },
  },
})
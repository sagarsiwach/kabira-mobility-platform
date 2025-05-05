// schema/objects/dropdownMenu.ts
import {defineField, defineType} from 'sanity'
import {SchemaIcon} from '@sanity/icons'

export default defineType({
  name: 'dropdownMenu',
  title: 'Dropdown Menu Content',
  type: 'object',
  icon: SchemaIcon,
  description: 'Defines the structure and content of a navigation dropdown.',
  // Removed 'common' group as the field is removed
  // groups: [
  //     { name: 'content', title: 'Dropdown Content', default: true },
  //     { name: 'common', title: 'Common Utility Links' }, // REMOVED GROUP
  // ],
  fields: [
    defineField({
      name: 'dropdownType',
      title: 'Type of Dropdown Content',
      type: 'string',
      // group: 'content', // No longer needed if only one group
      options: {
        list: [
          {title: 'Vehicle List', value: 'vehicleList'},
          {title: 'Grouped Links (for "More")', value: 'groupedLinks'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    // --- Vehicle List Specific Fields ---
    defineField({
      name: 'vehicleItems',
      title: 'Vehicle Items',
      type: 'array',
      // group: 'content', // No longer needed
      description: 'Add the vehicles to display in this dropdown.',
      of: [{type: 'vehicleDropdownItem'}],
      hidden: ({parent}) => (parent as any)?.dropdownType !== 'vehicleList',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            (context.parent as any)?.dropdownType === 'vehicleList' &&
            (!value || (value as any[]).length === 0)
          ) {
            return 'At least one vehicle item is required for a Vehicle List dropdown.'
          }
          return true
        }),
    }),
    // --- Grouped Links Specific Fields ---
    defineField({
      name: 'groupedLinkItems',
      title: 'Grouped Link Items',
      type: 'array',
      // group: 'content', // No longer needed
      description: 'Add links organized by group number (e.g., for the "More" section).',
      of: [{type: 'groupedLinkItem'}],
      hidden: ({parent}) => (parent as any)?.dropdownType !== 'groupedLinks',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            (context.parent as any)?.dropdownType === 'groupedLinks' &&
            (!value || (value as any[]).length === 0)
          ) {
            return 'At least one link item is required for a Grouped Links dropdown.'
          }
          return true
        }),
    }),
    // --- Common Utility Links Field REMOVED ---
    // defineField({
    //   name: 'utilityLinks',
    //   // ... field definition removed ...
    // }),
  ],
  preview: {
    select: {dropdownType: 'dropdownType'},
    prepare({dropdownType}) {
      return {
        title: `Dropdown: ${dropdownType || 'Not Set'}`, // Simplified preview
      }
    },
  },
})

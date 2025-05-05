// schema/objects/topLevelNavItem.ts
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'topLevelNavItem',
  title: 'Top-Level Nav Item',
  type: 'object',
  icon: MenuIcon,
  description: 'An item appearing in the main desktop navigation bar.',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'The text displayed (e.g., "Motorbikes", "Dealers").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemType',
      title: 'Item Action',
      type: 'string',
      options: {
        list: [
          {title: 'Direct Link', value: 'link'},
          {title: 'Open Dropdown', value: 'dropdown'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Use reusable link object
      description: 'Set the destination if Item Action is "Direct Link".',
      hidden: ({parent}) => (parent as any)?.itemType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.itemType === 'link' && !(value as any)?._type) {
            return 'Link Destination is required for Direct Link items.'
          }
          return true
        }),
    }),
    defineField({
      name: 'dropdown',
      title: 'Dropdown Menu Content',
      type: 'dropdownMenu', // Reference the dropdownMenu object type
      description: 'Configure the content of the dropdown panel if Item Action is "Open Dropdown".',
      hidden: ({parent}) => (parent as any)?.itemType !== 'dropdown',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.itemType === 'dropdown' && !(value as any)?._type) {
            return 'Dropdown Menu Content must be configured for Dropdown items.'
          }
          // You could add further validation based on dropdown._type if needed
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemType: 'itemType',
      linkType: 'link.linkType',
      dropdownType: 'dropdown.dropdownType',
    },
    prepare({title, itemType, linkType, dropdownType}) {
      let subtitle =
        itemType === 'link'
          ? `Direct Link (${linkType || 'Not Set'})`
          : `Opens Dropdown (${dropdownType || 'Not Set'})`
      return {
        title: title || 'Untitled Top-Level Item',
        subtitle: subtitle,
      }
    },
  },
})

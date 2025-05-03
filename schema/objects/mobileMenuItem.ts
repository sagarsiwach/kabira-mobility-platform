// schema/objects/mobileMenuItem.ts
import {defineField, defineType} from 'sanity'
import {MobileDeviceIcon} from '@sanity/icons'

export default defineType({
  name: 'mobileMenuItem',
  title: 'Mobile Menu Item (Root Level)',
  type: 'object',
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'The text shown for this item in the main mobile menu.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      options: {
        list: [
          {title: 'Direct Link', value: 'link'},
          {title: 'Submenu Trigger', value: 'submenuTrigger'},
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
    defineField({
      name: 'submenuType',
      title: 'Submenu Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Motorbikes', value: 'motorbikes'},
          {title: 'Scooters', value: 'scooters'},
          {title: 'More Links', value: 'more'},
        ],
        layout: 'dropdown',
      },
      description: 'Select which type of content this submenu will display.',
       // Corrected: Added type assertion for parent
      hidden: ({parent}) => (parent as any)?.itemType !== 'submenuTrigger',
      validation: (Rule) =>
        Rule.custom((value, context) => {
           // Corrected: Added type assertion for parent
          if ((context.parent as any)?.itemType === 'submenuTrigger' && !value) {
            return 'Submenu type is required when Item Type is Submenu Trigger.'
          }
          return true
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Display Icon (Optional)',
      type: 'string',
      description: 'Select an icon to display next to the label.',
      options: {
        list: [
          {title: 'Arrow Right', value: 'right'},
          {title: 'Arrow Top Right (External/Link)', value: 'topRight'},
          {title: 'More Horizontal', value: 'more'},
          {title: 'None', value: ''}
        ],
        layout: 'dropdown',
      },
       // Corrected: Added type assertion for parent
      initialValue: (context) => {
         const parent = context.parent as any; // Assert type
         if (parent?.itemType === 'submenuTrigger') return 'right';
         if (parent?.itemType === 'link' && parent?.link?.linkType === 'external') return 'topRight';
         return '';
      }
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemType: 'itemType',
      submenuType: 'submenuType',
      icon: 'icon',
    },
    prepare({title, itemType, submenuType, icon}) {
       const typeLabel = itemType === 'link' ? 'Direct Link' : `Submenu (${submenuType || '?'})`
       const iconLabel = icon ? ` | Icon: ${icon}` : ''
      return {
        title: title || 'Untitled Mobile Item',
        subtitle: `${typeLabel}${iconLabel}`
      }
    },
  },
})
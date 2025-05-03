// schema/objects/dropdownItem.ts
import {defineField, defineType} from 'sanity'
import {ListIcon, ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'dropdownItem',
  title: 'Dropdown Item (Vehicle/Link)',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      options: {
        list: [
          {title: 'Vehicle Link (Manual)', value: 'vehicleLink'},
          {title: 'Simple Link', value: 'simpleLink'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vehicleLink',
      validation: (Rule) => Rule.required(),
    }),

    // --- Fields for 'vehicleLink' type (Manual Entry) ---
    defineField({
      name: 'vehicleName',
      title: 'Vehicle Name Label',
      type: 'string',
      description: 'The name of the vehicle to display (e.g., "KM4000").',
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // *** ONLY validate if this type is selected ***
          if ((context.parent as any)?.itemType === 'vehicleLink' && !value) {
            return 'Vehicle Name Label is required for Vehicle Links.'
          }
          return true // Pass validation if not this type or if value exists
        }),
    }),
    defineField({
      name: 'vehicleLinkUrl',
      title: 'Vehicle Page URL',
      type: 'string',
      description:
        'The relative path or full URL for the vehicle\'s page (e.g., "/products/km4000").',
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // *** ONLY validate if this type is selected ***
          if ((context.parent as any)?.itemType === 'vehicleLink' && !value) {
            return 'Vehicle Page URL is required for Vehicle Links.'
          }
          // Optional: Add more specific path validation if needed
          // if ((context.parent as any)?.itemType === 'vehicleLink' && value && !/^\/(?:[\w-]+)*$/.test(value) && !value.startsWith('http')) {
          //   return 'Must be a valid relative path (e.g., /products/model) or a full URL.';
          // }
          return true // Pass validation if not this type or if value exists/is valid
        }),
    }),
    defineField({
      name: 'vehicleImage',
      title: 'Vehicle Image (Optional)',
      type: 'image',
      description: 'Optional: Upload or select the image for this vehicle item.',
      options: {hotspot: true},
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
    }),

    // --- Fields for 'simpleLink' type ---
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description: 'The text to display for this link (e.g., "Test Ride", "Book Now").',
      hidden: ({parent}) => (parent as any)?.itemType !== 'simpleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // *** ONLY validate if this type is selected ***
          if ((context.parent as any)?.itemType === 'simpleLink' && !value) {
            return 'Link Label is required for Simple Links.'
          }
          return true // Pass validation if not this type or if value exists
        }),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link', // Uses the reusable link object
      description: 'Where this simple link should navigate to.',
      hidden: ({parent}) => (parent as any)?.itemType !== 'simpleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // *** ONLY validate if this type is selected ***
          if ((context.parent as any)?.itemType === 'simpleLink') {
            // Check if the nested link object is properly configured
            if (!(value as any)?._type || !(value as any)?.linkType) {
              return 'Link Destination configuration is incomplete for Simple Links.'
            }
            // Add checks for the nested link type's required fields
            const linkData = value as any
            if (linkData.linkType === 'internal' && !linkData.internalReference?._ref) {
              return 'Internal Link Target is missing in the Link Destination.'
            }
            if (linkData.linkType === 'external' && !linkData.externalUrl) {
              return 'External URL is missing in the Link Destination.'
            }
            if (linkData.linkType === 'path' && !linkData.path) {
              return 'Simple Path is missing in the Link Destination.'
            }
          }
          return true // Pass validation if not this type or if nested link is valid
        }),
    }),
  ],
  preview: {
    select: {
      itemType: 'itemType',
      vehicleName: 'vehicleName',
      linkLabel: 'linkLabel',
      vehicleImage: 'vehicleImage',
    },
    prepare({itemType, vehicleName, linkLabel, vehicleImage}) {
      let title = 'Dropdown Item (Not configured)'
      let media = ListIcon
      if (itemType === 'vehicleLink') {
        title = `Vehicle: ${vehicleName || 'No Name'}`
        media = vehicleImage || ListIcon
      } else if (itemType === 'simpleLink') {
        title = `Link: ${linkLabel || 'No Label'}`
      }
      return {title, subtitle: `Type: ${itemType}`, media}
    },
  },
})

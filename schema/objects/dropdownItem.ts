// schema/objects/dropdownItem.ts
import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'

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
          if ((context.parent as any)?.itemType === 'vehicleLink' && !value) {
            return 'Vehicle Name Label is required for Vehicle Links.'
          }
          return true
        }),
    }),
    defineField({
      name: 'vehicleLinkUrl',
      title: 'Vehicle Page URL',
      type: 'string', // Storing as simple string for manual entry
      description:
        'The relative path for the vehicle\'s page (e.g., "/vehicles/km4000"). Start with /.',
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.itemType === 'vehicleLink' && !value) {
            return 'Vehicle Page URL is required for Vehicle Links.'
          }
          if (
            (context.parent as any)?.itemType === 'vehicleLink' &&
            value &&
            !value.startsWith('/')
          ) {
            return 'Relative URL must start with /'
          }
          return true
        }),
    }),
    defineField({
      name: 'vehicleImage',
      title: 'Vehicle Image (Optional)',
      type: 'image',
      description: 'Optional: Upload or select the image for this vehicle item.',
      options: {hotspot: true},
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          isHighlighted: true,
        }),
      ],
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
          if ((context.parent as any)?.itemType === 'simpleLink' && !value) {
            return 'Link Label is required for Simple Links.'
          }
          return true
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
          if ((context.parent as any)?.itemType === 'simpleLink') {
            // Check if the nested link object has its core properties defined
            const linkValue = value as any // Use type assertion
            if (!linkValue?._type || !linkValue?.linkType) {
              return 'Link Destination configuration is incomplete for Simple Links.'
            }
            // Check required fields based on the nested linkType
            if (linkValue.linkType === 'internal' && !linkValue.internalReference?._ref) {
              return 'Internal Link Target is missing in the Link Destination.'
            }
            if (linkValue.linkType === 'external' && !linkValue.externalUrl) {
              return 'External URL is missing in the Link Destination.'
            }
            if (linkValue.linkType === 'path' && !linkValue.path) {
              return 'Simple Path is missing in the Link Destination.'
            }
          }
          return true
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

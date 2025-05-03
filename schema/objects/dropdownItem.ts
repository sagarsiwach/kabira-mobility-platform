// schema/objects/dropdownItem.ts
import {defineField, defineType} from 'sanity'
import {ListIcon, ImageIcon} from '@sanity/icons' // Add ImageIcon

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
            return 'A vehicle name label is required.'
          }
          return true
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
          if ((context.parent as any)?.itemType === 'vehicleLink' && !value) {
            return 'A URL for the vehicle page is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'vehicleImage', // *** CHANGED FIELD NAME slightly for clarity ***
      title: 'Vehicle Image (Optional)',
      type: 'image', // *** CHANGED TYPE to image ***
      description: 'Optional: Upload or select the image for this vehicle item.',
      options: {
        hotspot: true, // Allows selecting focal point
      },
      hidden: ({parent}) => (parent as any)?.itemType !== 'vehicleLink',
      // No validation needed as it's optional
    }),

    // --- Fields for 'simpleLink' type (Unchanged) ---
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description: 'The text to display for this link (e.g., "Test Ride", "Book Now").',
      hidden: ({parent}) => (parent as any)?.itemType !== 'simpleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.itemType === 'simpleLink' && !value) {
            return 'A label is required for simple links.'
          }
          return true
        }),
    }),
    defineField({
      name: 'link',
      title: 'Link Destination',
      type: 'link',
      description: 'Where this simple link should navigate to.',
      hidden: ({parent}) => (parent as any)?.itemType !== 'simpleLink',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.itemType === 'simpleLink' && !(value as any)?._type) {
            return 'A link destination is required for simple links.'
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
      vehicleImage: 'vehicleImage', // Select the image for preview
    },
    prepare({itemType, vehicleName, linkLabel, vehicleImage}) {
      let title = 'Dropdown Item (Not configured)'
      let media = ListIcon // Default icon

      if (itemType === 'vehicleLink') {
        title = `Vehicle: ${vehicleName || 'No Name'}`
        media = vehicleImage || ListIcon // Use uploaded image or fallback icon
      } else if (itemType === 'simpleLink') {
        title = `Link: ${linkLabel || 'No Label'}`
        // Keep default icon for simple links maybe?
      }
      return {title, subtitle: `Type: ${itemType}`, media}
    },
  },
})

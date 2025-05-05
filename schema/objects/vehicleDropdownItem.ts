// schema/objects/vehicleDropdownItem.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'vehicleDropdownItem',
  title: 'Vehicle Dropdown Item',
  type: 'object',
  icon: RocketIcon,
  description: 'Represents a specific vehicle shown in a navigation dropdown.',
  groups: [
    {name: 'content', title: 'Content Source', default: true},
    {name: 'overrides', title: 'Manual Overrides'},
  ],
  fields: [
    defineField({
      name: 'sourceType',
      title: 'Content Source',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Link to Vehicle Model', value: 'reference'},
          {title: 'Manual Entry', value: 'manual'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'reference',
    }),
    defineField({
      name: 'vehicleModelRef',
      title: 'Vehicle Model',
      type: 'reference',
      group: 'content',
      description:
        'Link to the Vehicle Model document. Name, image, and link will be used automatically unless overridden.',
      to: [{type: 'vehicleModel'}],
      hidden: ({parent}) => (parent as any)?.sourceType !== 'reference',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.sourceType === 'reference' && !value) {
            return 'Vehicle Model reference is required when Source is "Link to Vehicle Model".'
          }
          return true
        }),
    }),
    // --- Manual fields (used if sourceType is 'manual' OR as overrides) ---
    defineField({
      name: 'manualTitle',
      title: 'Display Title',
      type: 'string',
      group: 'overrides',
      description:
        'Required if "Manual Entry" is selected. Overrides linked model name if "Link to Vehicle Model" is selected.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.sourceType === 'manual' && !value) {
            return 'Display Title is required for Manual Entry.'
          }
          // Check if reference exists when overriding title for a referenced item
          // if (parent?.sourceType === 'reference' && value && !parent.vehicleModelRef) {
          //    return 'Cannot override title without a linked Vehicle Model selected first.';
          // }
          return true
        }),
    }),
    defineField({
      name: 'manualUrl',
      title: 'Link URL',
      type: 'string', // Using string for flexibility (e.g., /products/km4000)
      group: 'overrides',
      description:
        'Required if "Manual Entry" is selected. Overrides linked model\'s URL if needed.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.sourceType === 'manual' && !value) {
            return 'Link URL is required for Manual Entry.'
          }
          if (parent?.sourceType === 'manual' && value && !value.startsWith('/')) {
            return 'Manual paths should typically start with "/". Use the Link object for external URLs.'
          }
          return true
        }),
    }),
    defineField({
      name: 'manualImage',
      title: 'Image',
      type: 'image',
      group: 'overrides',
      description:
        'Optional. Required if "Manual Entry" is selected and you want an image. Overrides linked model\'s image.',
      options: {hotspot: true},
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          // Only require if manual and no reference image would exist
          if (parent?.sourceType === 'manual' && !value) {
            // Could make this optional even for manual, depending on design
            // return 'Image is required for Manual Entry.';
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      sourceType: 'sourceType',
      manualTitle: 'manualTitle',
      refTitle: 'vehicleModelRef.name', // Get title from reference
      refImage: 'vehicleModelRef.image', // Get image from reference
      manualImage: 'manualImage',
    },
    prepare({sourceType, manualTitle, refTitle, refImage, manualImage}) {
      const title =
        manualTitle || (sourceType === 'reference' ? refTitle : '') || 'Untitled Vehicle Item'
      const media = manualImage || (sourceType === 'reference' ? refImage : undefined) || RocketIcon
      const subtitle = sourceType === 'reference' ? 'Linked to Model' : 'Manual Entry'
      return {title, subtitle, media}
    },
  },
})

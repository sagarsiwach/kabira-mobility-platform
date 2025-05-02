import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons'
// Removed React import if it was accidentally added

export default defineType({
  name: 'colorOption',
  title: 'Color Option',
  type: 'object',
  icon: DropIcon,
  description: 'Defines an available color for a vehicle model.',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      placeholder: 'e.g., Glossy Red',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorStart',
      title: 'Color Start (for gradient/display)',
      type: 'color', // Uses the @sanity/color-input plugin
      description: 'Primary or starting color for display purposes.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorEnd',
      title: 'Color End (optional, for gradient)',
      type: 'color',
      description: 'Secondary color for gradient effects (optional).',
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default Color?',
      type: 'boolean',
      description: 'Mark one color as the default selection for the model.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      colorStart: 'colorStart.hex',
      colorEnd: 'colorEnd.hex',
      isDefault: 'isDefault',
    },
    prepare({name, colorStart, colorEnd, isDefault}) {
      const title = `${name || 'Untitled Color'}${isDefault ? ' (Default)' : ''}`
      const subtitle = colorEnd ? `${colorStart} -> ${colorEnd}` : colorStart
      return {
        title: title,
        subtitle: subtitle,
        // media: <div style={{ backgroundColor: colorStart, width: '100%', height: '100%' }} />, // <<--- REMOVED THIS LINE
        // You could potentially use a standard icon here if needed:
        // media: DropIcon
      }
    },
  },
})
import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons'

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
        subtitle: subtitle || 'No color value',
        // Optional: Render a color swatch using React component if needed for studio preview
        // media: <div style={{ backgroundColor: colorStart || '#ccc', width: '100%', height: '100%' }} />
      }
    },
  },
})

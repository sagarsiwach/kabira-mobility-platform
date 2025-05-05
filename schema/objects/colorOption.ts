// schema/objects/colorOption.ts
import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons'

export default defineType({
  name: 'colorOption',
  title: 'Color Option (Model)',
  type: 'object',
  icon: DropIcon,
  description:
    'Defines a general color option available for a vehicle model (used in specs, selectors etc.). Names must be unique within the model.',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      description:
        'Display name for the color (e.g., "Glossy Red"). Must be unique within the model.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorStart',
      title: 'Color Value (Swatch)',
      type: 'color',
      description: 'Primary color used for UI swatches and potentially gradients.',
      options: {disableAlpha: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorEnd',
      title: 'Color End (Optional, for Gradient)',
      type: 'color',
      description: 'Secondary color if using gradient swatches (optional).',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default Color?',
      type: 'boolean',
      description: 'Mark ONE color as the default selection for the model.',
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
        title,
        subtitle: subtitle || 'No color value',
        media: DropIcon, // Use standard icon instead of custom React component to avoid JSX issues
      }
    },
  },
})

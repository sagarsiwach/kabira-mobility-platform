// schema/objects/colorOption.ts
import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons'
import React from 'react' // Import React for JSX

export default defineType({
  name: 'colorOption',
  title: 'Color Option (Model)',
  type: 'object',
  icon: DropIcon,
  description: 'Defines a general color option available for a vehicle model (used in specs, selectors etc.). Names must be unique within the model.',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      description: 'Display name for the color (e.g., "Glossy Red"). Must be unique within the model.',
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
    prepare(selection: { name?: string; colorStart?: string; colorEnd?: string; isDefault?: boolean }) {
        const { name, colorStart, colorEnd, isDefault } = selection;
        const title = `${name || 'Untitled Color'}${isDefault ? ' (Default)' : ''}`
        const subtitle = colorEnd ? `${colorStart} -> ${colorEnd}` : colorStart
        return {
            title: title,
            subtitle: subtitle || 'No color value',
             // Use a function returning a React Element for the media
            media: () => colorStart ?
                <div style={{
                    backgroundColor: colorStart,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1px solid rgba(0,0,0,0.1)' // Add subtle border
                }} /> : <DropIcon />, // Fallback icon
        }
    },
  },
})
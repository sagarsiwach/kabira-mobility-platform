// schema/objects/heroSection.ts

import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Secondary text that appears below the product title',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      description: 'Main product image shown in the hero section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keySpecs',
      title: 'Key Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'keySpec',
          fields: [
            defineField({
              name: 'name',
              title: 'Specification Name',
              type: 'string',
              description: 'The name of the specification (e.g., "Range")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The numerical or text value (e.g., "270")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'unit',
              title: 'Unit of Measurement',
              type: 'string',
              description: 'The unit for the value (e.g., "km", "hp", etc.)',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              value: 'value',
              unit: 'unit',
            },
            prepare({name, value, unit}) {
              return {
                title: name || 'Unnamed Spec',
                subtitle: unit ? `${value} ${unit}` : value,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).warning('Consider limiting to 3 key specs for best layout'),
    }),
  ],
})

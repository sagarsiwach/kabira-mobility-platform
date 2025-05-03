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
      name: 'title', // Adding title field as discussed
      title: 'Hero Title',
      type: 'string',
      description: 'The main headline for the hero section (e.g., the product name).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Secondary text that appears below the main title.',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      description: 'Main product image shown in the hero section.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required(),
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
    defineField({
      // Adding optional CTA button
      name: 'cta',
      title: 'Call to Action (Optional)',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'link',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || '',
        media: media || ImageIcon,
      }
    },
  },
})

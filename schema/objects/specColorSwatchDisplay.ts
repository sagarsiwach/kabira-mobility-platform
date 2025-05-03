// schema/objects/specColorSwatchDisplay.ts
import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons'

export default defineType({
  name: 'specColorSwatchDisplay',
  title: 'Spec: Color Swatch Display',
  type: 'object',
  icon: DropIcon,
  description: 'Displays a color swatch within the Technical Specifications list.',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      description: 'The name of the color (e.g., "Midnight Black").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color Hex Code',
      type: 'string', // Can use 'color' type if plugin installed
      description: 'The hex code for the color (e.g., "#000000"). Include the #.',
      validation: (Rule) =>
        Rule.required().regex(
          /^#[0-9A-Fa-f]{6}$/,
          'Must be a valid 6-digit hex code starting with #',
        ),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text (Optional)',
      type: 'string',
      description:
        'Brief description of the color for accessibility (e.g., "Glossy black swatch").',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix (Optional)',
      type: 'string',
      description: 'Optional text appended to the name (e.g., "(Glossy)", "(Matte)").',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      color: 'color',
      suffix: 'suffix',
    },
    prepare({name, color, suffix}) {
      const displaySuffix = suffix ? ` ${suffix}` : ''
      return {
        title: name || 'Untitled Color',
        subtitle: `${color || 'No hex code'}${displaySuffix}`,
      }
    },
  },
})

// schema/objects/turntableSection.ts
import {defineField, defineType} from 'sanity'
import {SyncIcon} from '@sanity/icons'

export default defineType({
  name: 'turntableSection',
  title: 'Turntable Section',
  type: 'object',
  icon: SyncIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the turntable section (e.g., "360° View")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'Optional short text displayed below the section title',
    }),
    defineField({
      name: 'modelCode',
      title: 'Model Code',
      type: 'string',
      description: 'The code identifying the 3D model to display (e.g., "km3000", "km4000")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'frameCount',
      title: 'Frame Count',
      type: 'number',
      description: 'The number of frames in the 360° sequence',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'turntableColor',
          fields: [
            defineField({
              name: 'name',
              title: 'Color Name',
              type: 'string',
              description: 'The display name for this color (e.g., "Pearl White")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'colorCode',
              title: 'Color Code',
              type: 'string',
              description:
                'The identifier for this color in the file system (e.g., "white", "red-metallic")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'colorValue',
              title: 'Color Swatch',
              type: 'color',
              description: 'The color to display in the swatch selector',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isDefault',
              title: 'Default Color',
              type: 'boolean',
              description: 'Whether this is the default color shown when the page loads',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              colorCode: 'colorCode',
              isDefault: 'isDefault',
            },
            prepare({title, colorCode, isDefault}) {
              return {
                title: `${title || 'Unnamed Color'}${isDefault ? ' (Default)' : ''}`,
                subtitle: `Code: ${colorCode}`,
                media: SyncIcon,
              }
            },
          },
        },
      ],
      validation: (Rule) => [
        Rule.required().min(1).error('At least one color must be defined'),
        Rule.custom((colors) => {
          if (!colors) return true
          const defaultColors = colors.filter((c) => c.isDefault)
          if (defaultColors.length !== 1) {
            return 'Exactly one color must be marked as default'
          }
          return true
        }),
      ],
    }),
    defineField({
      name: 'autoRotate',
      title: 'Auto-rotate',
      type: 'boolean',
      description: 'Whether the turntable should automatically rotate when loaded',
      initialValue: true,
    }),
    defineField({
      name: 'rotationSpeed',
      title: 'Rotation Speed',
      type: 'number',
      description: 'Speed of rotation (1-10, with 5 being moderate speed)',
      validation: (Rule) => Rule.min(1).max(10),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      modelCode: 'modelCode',
      colors: 'colors',
    },
    prepare({title, modelCode, colors = []}) {
      return {
        title: title || 'Turntable Section',
        subtitle: `Model: ${modelCode || '?'} | ${colors.length} color${colors.length !== 1 ? 's' : ''}`,
        media: SyncIcon,
      }
    },
  },
})

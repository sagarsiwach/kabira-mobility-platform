// schema/objects/techSpecsSection.ts
import {defineField, defineType} from 'sanity'
import {MasterDetailIcon} from '@sanity/icons'

export default defineType({
  name: 'techSpecsSection',
  title: 'Technical Specifications Section',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Overall Section Title',
      type: 'string',
      description:
        'Optional heading for the entire tech specs block on the page (e.g., "KM4000 Specifications").',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Overall Section Subtitle',
      type: 'string',
      description: 'Optional subheading for the tech specs block.',
    }),
    defineField({
      name: 'specGroups',
      title: 'Specification Groups',
      type: 'array',
      description:
        'Organize specifications into logical groups (e.g., Performance, Battery, Colors). Add groups as needed.',
      of: [
        {
          type: 'object',
          name: 'specGroup',
          title: 'Specification Group',
          fields: [
            defineField({
              name: 'title',
              title: 'Group Title',
              type: 'string',
              description:
                'Heading for this group (e.g., "Performance", "Battery", "Colors Available", "Features")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Specifications / Items in this Group',
              type: 'array',
              description: 'Add the specific data points for this group.',
              of: [
                {type: 'specKeyValue', title: 'Key/Value Pair'},
                {type: 'specColorSwatchDisplay', title: 'Color Swatch'},
                {type: 'specSimpleListItem', title: 'Simple List Item'},
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              itemCount: 'items.length',
            },
            prepare({title, itemCount = 0}) {
              return {
                title: title || 'Untitled Spec Group',
                subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
                icon: MasterDetailIcon, // Keep consistent icon
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Add at least one specification group.'),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      groups: 'specGroups',
    },
    prepare({title, groups}) {
      const groupCount = (groups as any[])?.length || 0
      return {
        title: title || 'Technical Specifications',
        subtitle: `${groupCount} group${groupCount === 1 ? '' : 's'}`,
        icon: MasterDetailIcon,
      }
    },
  },
})

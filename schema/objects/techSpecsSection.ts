// schema/objects/techSpecsSection.ts
import {defineField, defineType} from 'sanity'
import {MasterDetailIcon} from '@sanity/icons' // Or ListBulletIcon if preferred

export default defineType({
  name: 'techSpecsSection',
  title: 'Technical Specifications Section',
  type: 'object',
  icon: MasterDetailIcon,
  description:
    'A block for displaying grouped technical specifications, pulled from the linked Vehicle.',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Overall Section Title (Optional)',
      type: 'string',
      description:
        'Optional heading for the entire tech specs block on the page (e.g., "KM4000 Specifications").',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Overall Section Subtitle (Optional)',
      type: 'string',
      description: 'Optional subheading for the tech specs block.',
    }),
    defineField({
      name: 'specGroups',
      title: 'Specification Groups',
      type: 'array',
      description:
        'Organize specifications into logical groups (e.g., Performance, Battery, Dimensions). Add groups as needed.',
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
              description:
                'Add the specific data points for this group. Use the "Applicable Variants" field within each item if a spec is variant-specific.',
              of: [
                {type: 'specKeyValue', title: 'Key/Value Pair'},
                {type: 'specColorSwatchDisplay', title: 'Color Swatch'}, // Typically not variant-specific, but possible
                {type: 'specSimpleListItem', title: 'Simple Feature/List Item'},
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
                icon: MasterDetailIcon,
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
        title: title || 'Technical Specifications Section',
        subtitle: `${groupCount} group${groupCount === 1 ? '' : 's'}`,
        icon: MasterDetailIcon,
      }
    },
  },
})

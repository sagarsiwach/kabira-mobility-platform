// schema/objects/techSpecsSection.ts (Updated)
import {defineField, defineType} from 'sanity'
import {MasterDetailIcon} from '@sanity/icons'

export default defineType({
  name: 'techSpecsSection',
  title: 'Technical Specifications Section',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    // Section Header Fields (Optional)
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
    // Optional: If you want a main image SPECIFICALLY for the specs section header
    // defineField({
    //   name: 'sectionHeaderImage',
    //   title: 'Section Header Image',
    //   type: 'image',
    //   options: { hotspot: true }
    // }),

    // --- Specification Groups (Performance, Battery, etc.) ---
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
            // --- Items within this Group ---
            defineField({
              name: 'items',
              title: 'Specifications / Items in this Group',
              type: 'array',
              description: 'Add the specific data points for this group.',
              // Define WHICH specific spec types can be added here:
              of: [
                {type: 'specKeyValue', title: 'Key/Value Pair (for Range, Perf, Battery etc.)'},
                {type: 'specColorSwatchDisplay', title: 'Color Swatch (for Colors Available)'},
                {
                  type: 'specSimpleListItem',
                  title: 'Simple List Item (for Connectivity, Features)',
                },
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
              // Determine a representative icon based on title maybe? (Advanced)
              let icon = MasterDetailIcon // Default
              // Example: if (title?.toLowerCase().includes('color')) icon = DropIcon;
              return {
                title: title || 'Untitled Spec Group',
                subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
                icon: icon,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Add at least one specification group.'),
    }),
  ],
  preview: {
    // Preview for the whole techSpecsSection object when used in productPage
    select: {
      title: 'sectionTitle',
      groups: 'specGroups',
    },
    prepare({title, groups}) {
      const groupCount = groups?.length || 0
      return {
        title: title || 'Technical Specifications',
        subtitle: `${groupCount} group${groupCount === 1 ? '' : 's'}`,
        icon: MasterDetailIcon,
      }
    },
  },
})

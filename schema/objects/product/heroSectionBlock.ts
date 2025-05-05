// schema/objects/product/heroSectionBlock.ts
import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

// Define interface for Key Spec Item (helps with typing)
interface KeySpecItem {
  name?: string
  value?: string
  unit?: string
}

export default defineType({
  name: 'heroSectionBlock',
  title: 'Hero Section Block',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'buttons', title: 'Buttons'},
  ],
  fields: [
    // --- Content Group ---
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      group: 'content',
      description: 'The main headline for the hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'Secondary text that appears below the main title.',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      description: 'Main background image for the hero section. Alt text required.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required().error('Hero image alt text is required.'),
          // isHighlighted: true, // REMOVED: Not a valid property here
        }),
      ],
      validation: (Rule) => Rule.required().error('Hero image is required.'),
    }),
    defineField({
      name: 'keySpecs',
      title: 'Key Specifications (Max 3)',
      type: 'array',
      group: 'content',
      description: 'Highlight up to 3 key performance indicators.',
      of: [
        {
          name: 'keySpecItem',
          type: 'object',
          title: 'Key Spec', // Added title for clarity in the array item itself
          fields: [
            defineField({
              name: 'name',
              title: 'Spec Name',
              type: 'string',
              description: 'Label (e.g., Top Speed)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Spec Value',
              type: 'string',
              description: 'The value (e.g., 120)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'unit', title: 'Unit (Optional)', type: 'string'}),
          ],
          preview: {
            select: {name: 'name', value: 'value', unit: 'unit'},
            // Explicitly type the selection for prepare
            prepare(selection: KeySpecItem) {
              const {name, value, unit} = selection
              return {title: name || 'Spec', subtitle: `${value || '-'} ${unit || ''}`.trim()}
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).error('You can only add up to 3 key specs.'),
    }),

    // --- Buttons Group ---
    defineField({
      name: 'primaryButtonLabel',
      title: 'Primary Button Label',
      type: 'string',
      group: 'buttons',
      description: 'Text for the main button (e.g., "Book Now").',
      initialValue: 'Book Now',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      group: 'buttons',
      description:
        'Destination link (e.g., "/book" or "/book?model=km4000"). MUST start with "/" for internal or be a full URL.',
      validation: (Rule) =>
        Rule.required().custom((link: string | undefined) => {
          // Added type hint
          if (!link) return 'Link is required.' // Handle undefined case
          if (typeof link === 'string' && (link.startsWith('/') || link.startsWith('http'))) {
            return true
          }
          return 'Link must be a relative path (starting with /) or a full URL (starting with http/https).'
        }),
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Secondary Button Label',
      type: 'string',
      group: 'buttons',
      description: 'Text for the second button (e.g., "Test Ride").',
      initialValue: 'Test Ride',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'buttons',
      description:
        'Destination link (e.g., "/test-ride"). MUST start with "/" for internal or be a full URL.',
      validation: (Rule) =>
        Rule.required().custom((link: string | undefined) => {
          // Added type hint
          if (!link) return 'Link is required.' // Handle undefined case
          if (typeof link === 'string' && (link.startsWith('/') || link.startsWith('http'))) {
            return true
          }
          return 'Link must be a relative path (starting with /) or a full URL (starting with http/https).'
        }),
    }),
    defineField({
      name: 'optionalButtonLabel',
      title: 'Optional Third Button Label',
      type: 'string',
      group: 'buttons',
      description: 'Text for an optional third button.',
    }),
    defineField({
      name: 'optionalButtonLink',
      title: 'Optional Third Button Link',
      type: 'string',
      group: 'buttons',
      description:
        'Destination link for the third button. Required if label is set. MUST start with "/" for internal or be a full URL.',
      hidden: ({parent}) => !(parent as any)?.optionalButtonLabel,
      validation: (Rule) =>
        Rule.custom((value: string | undefined, context: any) => {
          // Added type hints
          if ((context.parent as any)?.optionalButtonLabel && !value) {
            return 'Link is required if label is set.'
          }
          if (
            value &&
            typeof value === 'string' &&
            !(value.startsWith('/') || value.startsWith('http'))
          ) {
            return 'Link must be a relative path (starting with /) or a full URL (starting with http/https).'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
    // Explicitly type the selection for prepare
    prepare(selection: {title?: string; subtitle?: string; media?: any}) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Hero Section Block',
        subtitle: subtitle || '',
        media: media || ImageIcon,
      }
    },
  },
})

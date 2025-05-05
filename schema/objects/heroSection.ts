// schema/objects/heroSection.ts (CORRECTED)
import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons' // Or another relevant icon

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Field 0
    defineField({
      name: 'titleOverride',
      title: 'Hero Title Override (Optional)',
      type: 'string', // <-- TYPE IS PRESENT
      description: 'Optional: Override the main headline. Defaults to the linked Vehicle Name.',
    }),
    // Field 1
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string', // <-- TYPE IS PRESENT
      description: 'Secondary text that appears below the main title.',
    }),
    // Field 2
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image', // <-- TYPE IS PRESENT
      description: 'Main background image for the hero section. Alt text required.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required().error('Hero image alt text is required.'),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required().error('Hero image is required.'),
    }),
    // Field 3
    defineField({
      name: 'keySpecsSource',
      title: 'Key Specs Source',
      type: 'string', // <-- TYPE IS PRESENT
      options: {
        list: [
          {title: 'Manually Entered Here', value: 'manual'},
          {title: 'Pull from Linked Vehicle (Default - Not Yet Implemented)', value: 'auto'},
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
      description: 'Choose how to populate key specs. (Auto-pull requires frontend logic)',
    }),
    // Field 4 (keySpecs array itself)
    defineField({
      name: 'keySpecs',
      title: 'Key Specifications (Manual Entry)',
      type: 'array', // <-- TYPE IS PRESENT
      hidden: ({parent}) => parent?.keySpecsSource !== 'manual',
      of: [
        {
          type: 'object', // Type for array item
          name: 'keySpec',
          fields: [
            // Fields for the object *inside* the array
            defineField({
              name: 'name',
              title: 'Spec Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Spec Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'unit', title: 'Unit (Optional)', type: 'string'}),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3).warning('Limit to 3 key specs.'),
    }),
    // Field 5
    defineField({
      name: 'cta',
      title: 'Call to Action (Optional)',
      type: 'ctaBlock', // <-- TYPE IS PRESENT (Assuming ctaBlock object exists)
      description: 'Optional main call to action button for the hero.',
    }),
  ],
  preview: {
    select: {title: 'titleOverride', subtitle: 'subtitle', media: 'image'},
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section (Uses Vehicle Name)',
        subtitle: subtitle || '',
        media: media || ImageIcon,
      }
    },
  },
})

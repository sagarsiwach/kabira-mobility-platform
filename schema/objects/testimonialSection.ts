// schema/objects/testimonialSection.ts
import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the testimonial section (optional)',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional introductory text for the testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'id',
              title: 'Testimonial ID (Optional)',
              type: 'slug', // Changed to slug for easier generation
              description: 'Unique identifier (auto-generates from author name).',
              options: {
                source: 'authorName',
                maxLength: 50,
                slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
              },
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'The testimonial text from the customer',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              description: 'Name of the person giving the testimonial',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'authorImage',
              title: 'Author Image (Optional)',
              type: 'image',
              description: 'Photo of the person giving the testimonial',
              options: {
                hotspot: true,
              },
              fields: [
                // Add alt text
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for accessibility. E.g., "Photo of [Author Name]"',
                  validation: (Rule) => Rule.required(),
                  isHighlighted: true,
                }),
              ],
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image (Optional)',
              type: 'image',
              description: 'Optional subtle background image for the testimonial card',
              options: {
                hotspot: true,
              },
              fields: [
                // Add alt text
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Describe the background image.',
                  isHighlighted: true,
                }),
              ],
            }),
          ],
          preview: {
            select: {
              quote: 'quote',
              authorName: 'authorName',
              authorImage: 'authorImage',
            },
            prepare({quote, authorName, authorImage}) {
              return {
                title: authorName || 'Anonymous',
                subtitle: quote ? (quote.length > 50 ? quote.substring(0, 50) + '...' : quote) : '',
                media: authorImage || UserIcon,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials.length',
    },
    prepare({title, testimonialCount}) {
      return {
        title: title || 'Testimonial Section',
        subtitle: `${testimonialCount || 0} testimonial(s)`,
        icon: UserIcon,
      }
    },
  },
})

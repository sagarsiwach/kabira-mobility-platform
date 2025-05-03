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
              title: 'Testimonial ID',
              type: 'string',
              description:
                'Unique identifier for the testimonial (system will generate if not provided)',
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
              title: 'Author Image',
              type: 'image',
              description: 'Photo of the person giving the testimonial',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              description: 'Optional subtle background image for the testimonial card',
              options: {
                hotspot: true,
              },
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
                media: authorImage,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})

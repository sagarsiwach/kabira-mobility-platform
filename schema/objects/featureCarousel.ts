// schema/objects/featureCarousel.ts

import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'featureCarousel',
  title: 'Feature Carousel',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the feature carousel section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      description: 'Brief text introducing the feature carousel',
    }),
    defineField({
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'carouselSlide',
          fields: [
            defineField({
              name: 'id',
              title: 'Slide ID',
              type: 'string',
              description: 'Unique identifier for the slide (system will generate if not provided)',
            }),
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              description: 'Main image for this carousel slide',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Slide Title',
              type: 'string',
              description: 'Main heading displayed on the slide',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Slide Subtitle',
              type: 'string',
              description: 'Secondary text displayed below the title',
            }),
            defineField({
              name: 'showOverlayButton',
              title: 'Show + Button',
              type: 'boolean',
              description: 'Whether to display the + button that opens detail overlay',
              initialValue: true,
            }),
            defineField({
              name: 'overlayTitle',
              title: 'Overlay Title',
              type: 'string',
              description: 'Title shown in the overlay (defaults to slide title if empty)',
              hidden: ({parent}) => !parent?.showOverlayButton,
            }),
            defineField({
              name: 'overlayBody',
              title: 'Overlay Body',
              type: 'text',
              rows: 5,
              description: 'Detailed text shown in the overlay when clicked',
              hidden: ({parent}) => !parent?.showOverlayButton,
            }),
            defineField({
              name: 'overlayBgColorOverride',
              title: 'Overlay Background Override',
              type: 'color',
              description: "Optional custom background color for this slide's overlay",
              hidden: ({parent}) => !parent?.showOverlayButton,
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
                title: title || 'Untitled Slide',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})

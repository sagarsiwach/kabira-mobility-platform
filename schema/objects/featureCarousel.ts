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
              title: 'Slide ID (Optional)',
              type: 'slug', // Using slug for auto-generation possibility
              description: 'Unique identifier for linking/analytics (auto-generates from title).',
              options: {
                source: 'title',
                maxLength: 50,
                slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
              },
            }),
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              description: 'Main image for this carousel slide',
              options: {
                hotspot: true,
              },
              fields: [
                // Add alt text
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility.',
                  validation: (Rule) => Rule.required(),
                  isHighlighted: true,
                }),
              ],
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
              hidden: ({parent}) => !(parent as any)?.showOverlayButton, // Corrected hidden logic
            }),
            defineField({
              name: 'overlayBody',
              title: 'Overlay Body',
              type: 'text', // Changed to simple text for overlay
              rows: 5,
              description: 'Detailed text shown in the overlay when clicked',
              hidden: ({parent}) => !(parent as any)?.showOverlayButton, // Corrected hidden logic
            }),
            defineField({
              name: 'overlayBgColorOverride',
              title: 'Overlay Background Override',
              type: 'color',
              description: "Optional custom background color for this slide's overlay",
              hidden: ({parent}) => !(parent as any)?.showOverlayButton, // Corrected hidden logic
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
  preview: {
    select: {
      title: 'title',
      slideCount: 'slides.length',
    },
    prepare({title, slideCount}) {
      return {
        title: title || 'Feature Carousel',
        subtitle: `${slideCount || 0} slide(s)`,
        icon: ImagesIcon,
      }
    },
  },
})

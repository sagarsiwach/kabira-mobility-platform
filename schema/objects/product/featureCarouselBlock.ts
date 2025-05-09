// File: schema/objects/product/featureCarouselBlock.ts
// (Or wherever you define blocks for your Page Builder)

import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons' // Using ControlsIcon as an example for a carousel/slider

export default defineType({
  name: 'featureCarouselBlock',
  title: 'Feature Carousel',
  type: 'object',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for this carousel section (e.g., "Discover Our Features").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle (Optional)',
      type: 'string', // Changed from 'text' to 'string' for a single line subtitle
      description: 'A brief introduction or subtitle for the section.',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      description: 'Add and arrange feature slides for the carousel.',
      of: [
        {
          type: 'featureSlide', // Reference to the object type defined above
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one slide is required for the carousel.'),
    }),
    // --- Optional: Configuration for the carousel behavior ---
    // You can add these later if needed, keeping it simple for now.
    // defineField({
    //   name: 'slidesPerViewDesktop',
    //   title: 'Slides Per View (Desktop)',
    //   type: 'number',
    //   description: 'How many slides are visible at once on larger screens. E.g., 3 or 3.5 (for peeking).',
    //   initialValue: 3,
    // }),
    // defineField({
    //   name: 'autoplay',
    //   title: 'Enable Autoplay',
    //   type: 'boolean',
    //   initialValue: false,
    // }),
    // defineField({
    //   name: 'autoplayDelay',
    //   title: 'Autoplay Delay (ms)',
    //   type: 'number',
    //   initialValue: 5000,
    //   hidden: ({parent}) => !(parent as any)?.autoplay,
    // }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      slidesCount: 'slides.length',
    },
    prepare({title, slidesCount}) {
      return {
        title: title || 'Feature Carousel',
        subtitle: `${slidesCount || 0} slide(s)`,
        icon: ControlsIcon,
      }
    },
  },
})

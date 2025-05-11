// schema/objects/product/galleryBlock.ts
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryBlock',
  title: 'Image Gallery Block',
  type: 'object',
  icon: ImagesIcon,
  // No groups needed if layout fields are removed, or keep 'content' if preferred
  // groups: [
  //   {name: 'content', title: 'Content', default: true},
  // ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title (Optional)',
      type: 'string',
      // group: 'content', // Only if groups are kept
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle (Optional)',
      type: 'text',
      rows: 2,
      // group: 'content', // Only if groups are kept
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      // group: 'content', // Only if groups are kept
      initialValue: [],
      description: 'Add and arrange images for the gallery. Alt text is required for each image.',
      of: [{type: 'galleryImage'}],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one image is required for the gallery.'),
    }),
    // --- Layout fields REMOVED ---
    // defineField({
    //   name: 'layout',
    //   title: 'Gallery Layout',
    //   type: 'string',
    //   group: 'layout',
    //   options: { /* ... */ },
    //   initialValue: 'carousel',
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: 'imageAspectRatio',
    //   title: 'Image Aspect Ratio (for uniform display)',
    //   type: 'string',
    //   group: 'layout',
    //   options: { /* ... */ },
    //   initialValue: '4/3',
    //   description: "...",
    // }),
    // defineField({
    //   name: 'autoplay',
    //   title: 'Carousel Autoplay',
    //   type: 'boolean',
    //   group: 'layout',
    //   initialValue: false,
    //   hidden: ({parent}) => parent?.layout !== 'carousel',
    // }),
    // defineField({
    //   name: 'autoplayDelay',
    //   title: 'Autoplay Delay (ms)',
    //   type: 'number',
    //   group: 'layout',
    //   initialValue: 5000,
    //   hidden: ({parent}) => !(parent?.layout === 'carousel' && parent?.autoplay),
    //   validation: (Rule) => Rule.min(1000).warning('Delay should be at least 1000ms (1 second).'),
    // }),
    // defineField({
    //   name: 'showCarouselDots',
    //   title: 'Show Carousel Dots',
    //   type: 'boolean',
    //   group: 'layout',
    //   initialValue: true,
    //   hidden: ({parent}) => parent?.layout !== 'carousel',
    // }),
    // defineField({
    //   name: 'showCarouselArrows',
    //   title: 'Show Carousel Arrows',
    //   type: 'boolean',
    //   group: 'layout',
    //   initialValue: true,
    //   hidden: ({parent}) => parent?.layout !== 'carousel',
    // }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      imagesCount: 'images.length',
      // layout: 'layout', // Removed layout from select
    },
    prepare({title, imagesCount}) {
      // Removed layout from prepare params
      return {
        title: title || 'Image Gallery',
        // subtitle: `${layout || 'default'} layout | ${imagesCount || 0} image(s)`, // Simplified subtitle
        subtitle: `${imagesCount || 0} image(s)`,
        icon: ImagesIcon,
      }
    },
  },
})

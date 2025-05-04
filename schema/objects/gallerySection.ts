// schema/objects/gallerySection.ts
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons' // Using ImagesIcon

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (Optional)',
      type: 'string',
      description: 'Heading for the gallery section (e.g., "Explore Every Angle").',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle (Optional)',
      type: 'string',
      description: 'Optional introductory text for the gallery.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      description: 'Add images for the gallery.',
      of: [
        {
          name: 'galleryImage', // Optional: Give the array item type a name
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true, // Enable hotspot for better cropping
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Crucial for accessibility and SEO. Describe the image.',
              validation: (Rule) => Rule.required(),
              isHighlighted: true,
            }),
            defineField({
              name: 'caption', // Changed from 'title' to 'caption' for clarity
              type: 'string',
              title: 'Caption (Optional)',
              description: 'Optional text displayed with the image, e.g., in the lightbox.',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Add at least one image to the gallery.'),
    }),
    // Add layout options if needed later (e.g., grid, carousel)
    // defineField({
    //   name: 'layout',
    //   title: 'Layout Style',
    //   type: 'string',
    //   options: { list: ['Carousel', 'Grid'] },
    //   initialValue: 'Carousel'
    // })
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length',
      firstImage: 'images.0.asset',
    },
    prepare({title, imageCount, firstImage}) {
      return {
        title: title || 'Gallery Section',
        subtitle: `${imageCount || 0} image(s)`,
        media: firstImage || ImagesIcon,
      }
    },
  },
})

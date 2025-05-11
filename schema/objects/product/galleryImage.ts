// schema/objects/product/galleryImage.ts
import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image Item',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Image asset is required for each gallery item.'),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required().error('Alt text for gallery image is required.'),
          isHighlighted: true,
          description: 'Crucial for accessibility. Describe the image.',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Image Caption (Optional)',
          description: 'Optional caption, often shown in lightbox or below the image.',
        }),
      ],
    }),
    defineField({
      name: 'headline',
      title: 'Headline Overlay (Optional)',
      type: 'string',
      description: 'Text to overlay on this image in the gallery view (if supported by frontend).',
    }),
    defineField({
      name: 'subheadline',
      title: 'Sub-headline Overlay (Optional)',
      type: 'text',
      rows: 2,
      description: 'Smaller text to overlay on this image (if supported by frontend).',
    }),
  ],
  preview: {
    select: {
      title: 'headline', // Use headline for title if available
      media: 'image',
      alt: 'image.alt', // Fallback to alt text
      caption: 'image.caption', // Fallback to caption
    },
    prepare({title, media, alt, caption}) {
      return {
        title: title || alt || caption || 'Untitled Image',
        media: media || ImageIcon,
      }
    },
  },
})

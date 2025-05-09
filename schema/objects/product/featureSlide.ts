// File: schema/objects/product/featureSlide.ts
// (Create this new file if it doesn't exist, or add to an existing objects file)

import {defineField, defineType} from 'sanity'
import {ImageIcon, PlayIcon, LaunchIcon} from '@sanity/icons' // Using LaunchIcon for Pop-up

export default defineType({
  name: 'featureSlide',
  title: 'Feature Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      description: 'Main title displayed on the card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Card Subtitle',
      type: 'string',
      description: 'Smaller text displayed below the main title on the card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Upload the image for the card background (from Sanity media library).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Crucial for accessibility. Describe the image.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if (parent?.mediaType === 'image' && !value) {
            return 'An image is required when Media Type is "Image".'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (R2 Storage)',
      type: 'url',
      description: 'Full URL to the video file (e.g., from Cloudflare R2). MP4 recommended.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if (parent?.mediaType === 'video') {
            if (!value) return 'A video URL is required when Media Type is "Video".'
            // Basic URL validation
            try {
              new URL(value)
            } catch (e) {
              return 'Must be a valid URL.'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'enablePopup',
      title: 'Enable Pop-up/Modal?',
      type: 'boolean',
      description: 'If yes, clicking the card/icon will open a modal with more details.',
      initialValue: true,
    }),
    defineField({
      name: 'popupContent',
      title: 'Pop-up Content (RTF)',
      type: 'blockContent', // Reusing your existing rich text field definition
      description:
        'Detailed content for the pop-up. Supports H1, H2, H3, images, and descriptions.',
      hidden: ({parent}) => !(parent as any)?.enablePopup, // Type assertion
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if ((parent as any)?.enablePopup && (!value || value.length === 0)) {
            return 'Pop-up content is required when "Enable Pop-up" is "Yes".'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      mediaType: 'mediaType',
      image: 'image',
      videoUrl: 'videoUrl',
      enablePopup: 'enablePopup',
    },
    prepare({title, subtitle, mediaType, image, videoUrl, enablePopup}) {
      let mediaIcon = ImageIcon
      if (mediaType === 'video') {
        mediaIcon = PlayIcon
      }
      const popupIndicator = enablePopup ? ` (+Pop-up)` : ''
      return {
        title: title || 'Untitled Slide',
        subtitle: `${subtitle || ''}${popupIndicator}`,
        media: mediaType === 'image' ? image : mediaIcon,
      }
    },
  },
})

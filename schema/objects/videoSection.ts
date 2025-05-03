// schema/objects/videoSection.ts
import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the video section (optional)',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional introductory text for the video section',
    }),
    defineField({
      name: 'videoFile',
      title: 'Background Video File (MP4)',
      type: 'file',
      description: 'Upload the background/hover video file (MP4 recommended)',
      options: {
        accept: 'video/mp4', // Enforce MP4 for browser compatibility
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image (Thumbnail)',
      type: 'image',
      description: 'Static image shown before video plays (thumbnail)',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the poster image.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeLink',
      title: 'YouTube Link (for Fullscreen)',
      type: 'url',
      description: 'URL to YouTube video for fullscreen overlay playback',
      validation: (Rule) =>
        Rule.required()
          .uri({
            // Make required
            scheme: ['http', 'https'],
          })
          .regex(/youtube\.com|youtu\.be/, 'Must be a valid YouTube URL'),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'CSS aspect ratio value (e.g., "16/9", "4/3", "1")',
      initialValue: '16/9',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      youtube: 'youtubeLink',
      media: 'posterImage',
    },
    prepare({title, youtube, media}) {
      return {
        title: title || 'Video Section',
        subtitle: youtube || 'No YouTube link',
        media: media || PlayIcon,
      }
    },
  },
})

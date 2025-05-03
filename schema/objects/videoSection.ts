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
      title: 'Video File',
      type: 'file',
      description: 'Upload the background/hover video file (MP4 recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Static image shown before video plays (thumbnail)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'youtubeLink',
      title: 'YouTube Link',
      type: 'url',
      description: 'URL to YouTube video for fullscreen overlay playback',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        })
          .regex(/youtube\.com|youtu\.be/)
          .warning('Must be a valid YouTube URL'),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'CSS aspect ratio value (e.g., "16/9", "4/3", "1")',
      initialValue: '16/9',
    }),
  ],
})

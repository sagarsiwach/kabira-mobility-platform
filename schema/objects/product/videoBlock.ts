// schema/objects/product/videoBlock.ts
import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
  name: 'videoBlock',
  title: 'Featured Video Block',
  type: 'object',
  icon: PlayIcon,
  description: 'A block for showcasing a single featured video with optional text.',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title (Optional)',
      type: 'string',
      description: 'Heading for the video section.',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle (Optional)',
      type: 'text',
      rows: 2,
      description: 'Optional introductory text for the video.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Self-hosted Video File',
      type: 'file',
      description: 'Upload a video file (e.g., MP4). Used if "Video URL" is empty.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (External)',
      type: 'url',
      description: 'URL to an external video (e.g., YouTube, Vimeo). Overrides self-hosted file.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {videoFile?: {asset?: any}}
          if (!value && !parent?.videoFile?.asset) {
            return 'Either a video file or a video URL is required.'
          }
          if (value) {
            try {
              new URL(value)
            } catch (e) {
              return 'Must be a valid URL format (e.g., https://example.com/video.mp4).'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image (Thumbnail)',
      type: 'image',
      description: 'Static image shown before video plays. REQUIRED.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required().error('Alt text for poster image is required.'),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required().error('A poster image is required for the video.'),
    }),
    defineField({
      name: 'caption',
      title: 'Video Caption (Optional)',
      type: 'string',
      description: 'Optional text displayed below the video player.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Player Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9 (Widescreen)', value: '16/9'},
          {title: '4:3 (Standard)', value: '4/3'},
          {title: '1:1 (Square)', value: '1/1'},
          {title: '9:16 (Vertical)', value: '9/16'},
          {title: 'Auto (from video metadata, if possible)', value: 'auto'},
        ],
        layout: 'dropdown',
      },
      initialValue: '16/9',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay Video (Muted)',
      type: 'boolean',
      description:
        'If the video should attempt to autoplay (muted) when it becomes visible. Note: browser policies might prevent autoplay.',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showControls',
      title: 'Show Video Player Controls',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      caption: 'caption',
      media: 'posterImage',
    },
    prepare({title, caption, media}) {
      const mainTitle = title || caption || 'Featured Video'
      const subTitle = title && caption ? caption : title || caption ? 'Video Block' : 'Video Block'
      return {
        title: mainTitle,
        subtitle: subTitle,
        media: media || PlayIcon,
      }
    },
  },
})

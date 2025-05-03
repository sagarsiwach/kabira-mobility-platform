// schema/objects/textWithImageBlock.ts
import {defineField, defineType} from 'sanity'
import {SplitHorizontalIcon} from '@sanity/icons' // Example Icon

export default defineType({
  name: 'textWithImageBlock',
  title: 'Text w/ Image Block',
  type: 'object',
  icon: SplitHorizontalIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
      description: 'Heading for this section.',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'blockContent', // Use rich text editor
      description: 'The main text content for the block.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility. Describe the image.',
          validation: (Rule) => Rule.required(),
          isHighlighted: true,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left, Text Right', value: 'left'},
          {title: 'Image Right, Text Left', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Optional CTA button
      name: 'cta',
      title: 'Call to Action (Optional)',
      type: 'ctaBlock', // Reuse the CTA block object
    }),
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text', // Select blockContent field
      media: 'image',
      position: 'imagePosition',
    },
    prepare({title, text, media, position}) {
      // Basic text preview from blockContent
      const firstTextBlock = (text || []).find((block: any) => block._type === 'block')
      const subtitle = firstTextBlock?.children?.[0]?.text || 'No text content'
      const posLabel = position === 'left' ? '[Img|Txt]' : '[Txt|Img]'

      return {
        title: title || 'Text w/ Image Block',
        subtitle: `${posLabel} ${subtitle.length > 40 ? subtitle.substring(0, 40) + '...' : subtitle}`,
        media: media || SplitHorizontalIcon,
      }
    },
  },
})

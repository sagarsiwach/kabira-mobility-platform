// schema/objects/ctaBlock.ts
import {defineField, defineType} from 'sanity'
import {PlayIcon as CtaIcon} from '@sanity/icons' // Using PlayIcon as example for CTA

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action Block',
  type: 'object',
  icon: CtaIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
      description: 'Heading for the CTA section.',
    }),
    defineField({
      name: 'text',
      title: 'Text (Optional)',
      type: 'text', // Simple text or blockContent if rich text needed
      rows: 3,
      description: 'Supporting text for the call to action.',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'The text displayed on the button.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Button Link',
      type: 'link', // Use the reusable link object
      description: 'Where the button should navigate to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'center',
      description: 'How the content within the block should be aligned.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      buttonLabel: 'buttonLabel',
    },
    prepare({title, buttonLabel}) {
      return {
        title: title || 'Call to Action',
        subtitle: `Button: ${buttonLabel || 'Not Set'}`,
        icon: CtaIcon,
      }
    },
  },
})

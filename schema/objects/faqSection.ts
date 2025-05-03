// schema/objects/faqSection.ts

import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons' // Changed to an available icon

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon, // Changed icon
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the FAQ section (e.g., "Frequently Asked Questions")',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional introductory text for the FAQ section',
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Whether multiple questions can be expanded simultaneously',
      initialValue: false,
    }),
    defineField({
      name: 'initialOpenIndex',
      title: 'Initially Open Question',
      type: 'number',
      description: 'Index of question to show open by default (-1 for none)',
      initialValue: -1,
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'id',
              title: 'Question ID',
              type: 'string',
              description:
                'Unique identifier for the question (system will generate if not provided)',
            }),
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'The frequently asked question',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description: 'The response to the question',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer',
            },
            prepare({question, answer}) {
              return {
                title: question || 'Untitled Question',
                subtitle: answer
                  ? answer.length > 50
                    ? answer.substring(0, 50) + '...'
                    : answer
                  : '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})

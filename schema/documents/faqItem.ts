// schema/documents/faqItem.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item (Global)',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent', // Use rich text for answers
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      description: 'Assign this FAQ to a category.',
      to: [{type: 'faqCategory'}], // Points to the faqCategory document type
      validation: (Rule) => Rule.required().error('Each FAQ must belong to a category.'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      categoryTitle: 'category.title',
    },
    prepare({title, categoryTitle}) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: categoryTitle ? `Category: ${categoryTitle}` : 'No Category Assigned',
      }
    },
  },
})

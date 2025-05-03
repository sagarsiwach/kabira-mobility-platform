// schema/documents/faqItem.ts (Modification)
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
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    // --- MODIFIED CATEGORY FIELD ---
    defineField({
      name: 'category',
      title: 'Category', // Title remains the same
      type: 'reference', // <-- Changed type to reference
      description: 'Assign this FAQ to a category.',
      to: [{type: 'faqCategory'}], // <-- Points to the faqCategory document type
      // Make it required if every FAQ must have a category:
      // validation: Rule => Rule.required()
    }),
    // --- END MODIFICATION ---
  ],
  preview: {
    select: {
      title: 'question',
      categoryTitle: 'category.title', // Access the title of the referenced category
    },
    prepare({title, categoryTitle}) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: categoryTitle ? `Category: ${categoryTitle}` : 'No Category',
      }
    },
  },
})

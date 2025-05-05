// schema/objects/faqBlock.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqBlock',
  title: 'FAQ Section Block',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'titleOverride', // Keep existing name for data compatibility if possible
      title: 'Section Title Override',
      type: 'string',
      description:
        'Optional: Title displayed above the FAQ list. Defaults to "Frequently Asked Questions" if empty.',
    }),
    defineField({
      name: 'referencedFaqs',
      title: 'Select FAQs',
      type: 'array',
      description: 'Choose relevant FAQs from the global library.',
      of: [
        {
          type: 'reference',
          to: [{type: 'faqItem'}],
        },
      ],
      validation: (Rule) => Rule.unique().error('Each FAQ can only be added once here.'),
    }),
    defineField({
      name: 'allowMultipleOpen', // Keep existing name
      title: 'Allow Multiple Open FAQs?',
      type: 'boolean',
      description: 'Allow users to expand multiple questions at once.',
      initialValue: false,
    }),
    defineField({
      name: 'initialOpenIndex', // Keep existing name
      title: 'Initially Open FAQ Index',
      type: 'number',
      description:
        'Index (0=first selected, etc.) of the FAQ to show open by default. Use -1 or empty for none.',
      initialValue: -1,
      validation: (Rule) => Rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: 'titleOverride',
      faqCount: 'referencedFaqs.length',
    },
    prepare({title, faqCount}) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${faqCount || 0} FAQ(s) selected`,
        media: HelpCircleIcon,
      }
    },
  },
})

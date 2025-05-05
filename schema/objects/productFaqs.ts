// schema/objects/productFaqs.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'productFaqs',
  title: 'Product FAQ Block',
  type: 'object',
  icon: HelpCircleIcon,
  description: 'A block to display selected FAQs specifically on a Product Page.',
  fields: [
    defineField({
      name: 'titleOverride',
      title: 'Section Title Override',
      type: 'string',
      description:
        'Optional: Title displayed above the FAQ list on this page. Defaults to "Frequently Asked Questions" if empty.',
    }),
    defineField({
      name: 'referencedFaqs',
      title: 'Select FAQs for this Page',
      type: 'array',
      description:
        'Choose relevant FAQs from the global library to display in this specific product page section.',
      of: [
        {
          type: 'reference',
          to: [{type: 'faqItem'}], // References the globally defined FAQ items
        },
      ],
      validation: (Rule) => Rule.unique().error('Each FAQ can only be added once to this block.'),
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Allow Multiple Open FAQs?',
      type: 'boolean',
      description: 'Allow users to expand multiple questions at once in the UI for this block.',
      initialValue: false,
    }),
    defineField({
      name: 'initialOpenIndex',
      title: 'Initially Open FAQ Index',
      type: 'number',
      description:
        'Index (0=first selected, 1=second selected, etc.) of the FAQ to show open by default within this block. Use -1 or leave empty for none.',
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
        title: title || 'Product FAQ Section',
        subtitle: `${faqCount || 0} FAQ(s) selected`,
        media: HelpCircleIcon,
      }
    },
  },
})

// schema/singletons/faqPage.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page Settings',
  type: 'document',
  icon: HelpCircleIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'The title displayed for the main FAQ page.',
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text (Optional)',
      type: 'blockContent',
      group: 'content',
      description: 'Optional text displayed at the top of the FAQ page.',
    }),
    // Optional: Add featured categories if needed
    // defineField({
    //   name: 'featuredCategories',
    //   title: 'Featured Categories (Optional)',
    //   type: 'array',
    //   group: 'content',
    //   description: 'Highlight specific FAQ categories at the top.',
    //   of: [{type: 'reference', to: [{type: 'faqCategory'}]}]
    // }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for the main FAQ page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'FAQ Page Settings',
      }
    },
  },
})

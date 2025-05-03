// schema/singletons/blogPage.ts
import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page Settings',
  type: 'document',
  icon: ComposeIcon,
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
      description: 'The title displayed for the main blog listing page.',
      initialValue: 'Blog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text (Optional)',
      type: 'blockContent',
      group: 'content',
      description: 'Optional text displayed at the top of the blog listing.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure search engine appearance for the main blog page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Blog Page Settings',
      }
    },
  },
})

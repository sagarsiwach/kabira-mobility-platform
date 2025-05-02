import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the category.',
       validation: Rule => Rule.required(),
    }),
     defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL identifier for the category.',
      options: {
        source: 'title',
        maxLength: 96,
      },
       validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description for the category.',
    }),
  ],
})
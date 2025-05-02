import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Author's full name.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "URL identifier for the author's page.",
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "Author's profile picture.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'A short biography of the author.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
     prepare({title, media}) {
      return {
        title: title || 'Untitled Author',
        media: media || UserIcon,
      }
    },
  },
})
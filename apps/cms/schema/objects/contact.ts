import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Primary contact phone number.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Primary contact email address.',
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must be a valid email address'),
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Optional website address (e.g., https://www.example.com).',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).warning('Full URL including http(s):// is recommended.'),
    }),
  ],
  preview: {
    select: {
      phone: 'phone',
      email: 'email',
    },
    prepare({phone, email}) {
      return {
        title: phone || email || 'No contact info',
        subtitle: phone && email ? email : '',
      }
    },
  },
})
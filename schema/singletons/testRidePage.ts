// schema/singletons/testRidePage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons' // Using RocketIcon as example

export default defineType({
  name: 'testRidePage',
  title: 'Test Ride Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Page Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'The main title displayed on the /test-ride page.',
      initialValue: 'Book Your Test Ride',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text',
      type: 'blockContent',
      group: 'content',
      description: 'Content displayed above the test ride form (e.g., benefits, process).',
    }),
    defineField({
      name: 'formPlaceholderImage',
      title: 'Form Area Image (Optional)',
      type: 'image',
      group: 'content',
      description: 'Optional image displayed near or behind the form.',
      options: {
        hotspot: true,
      },
      fields: [
        // Add alt text
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image.',
          isHighlighted: true,
        }),
      ],
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Message Title',
      type: 'string',
      group: 'content',
      description: 'Heading shown after successful form submission.',
      initialValue: 'Test Ride Booked!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message Body',
      type: 'blockContent',
      group: 'content',
      description: 'Content shown after successful form submission (e.g., next steps).',
      validation: (Rule) => Rule.required(),
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings', // Use the enhanced SEO object
      group: 'seo',
      description: 'Configure search engine appearance for the Test Ride page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Test Ride Page',
      }
    },
  },
})

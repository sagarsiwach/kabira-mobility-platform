import {defineType, defineField} from 'sanity'
import {ClockIcon} from '@sanity/icons'
import {daysOfWeek} from '../constants' // Import days list

export default defineType({
  name: 'dealerHours',
  title: 'Operating Hours',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'day',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: daysOfWeek,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'open',
      title: 'Opening Time',
      description: 'Use HH:MM (24hr) format (e.g., 09:00) or type "Closed".',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^(\d{2}:\d{2}|Closed)$/i, 'Use HH:MM format or "Closed"'),
    }),
    defineField({
      name: 'close',
      title: 'Closing Time',
      description: 'Use HH:MM (24hr) format (e.g., 18:00) or type "Closed".',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^(\d{2}:\d{2}|Closed)$/i, 'Use HH:MM format or "Closed"'),
    }),
  ],
  preview: {
    select: {
      day: 'day',
      open: 'open',
      close: 'close',
    },
    prepare({day, open, close}) {
      const title = day || 'No day selected'
      const subtitle =
        open?.toLowerCase() === 'closed' ? 'Closed' : `${open || '?'} - ${close || '?'}`
      return {title, subtitle}
    },
  },
})
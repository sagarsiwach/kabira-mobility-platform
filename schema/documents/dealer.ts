// apps/cms/schemas/documents/dealer.ts
import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'
import {defaultDealerHours} from '../constants' // Import default hours

export default defineType({
  name: 'dealer',
  title: 'Dealer',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'location', title: 'Location'},
    {name: 'hours', title: 'Operating Hours'},
    {name: 'meta', title: 'Meta'},
  ],
  fields: [
    // Details Group
    defineField({
      name: 'name',
      title: 'Dealer Name',
      type: 'string',
      description: 'Full official name of the dealership.',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    // --- NEW DEALER CODE FIELD ---
    defineField({
      name: 'dealerCode',
      title: 'Dealer Code',
      type: 'string',
      description: 'Unique identifier for the dealer (e.g., HELLOEV-1001).',
      group: 'details', // Added to the 'details' group
      validation: (Rule) => [
        Rule.required(),
        Rule.unique().error('This Dealer Code is already in use.'),
        Rule.regex(
          /^[A-Z0-9]+-\d{4}$/, // Regex for PREFIX(uppercase/digits)-FOURDIGITS
          { name: 'dealerCodeFormat', invert: false } // Optional name for the constraint
        ).error('Format must be PREFIX-#### (e.g., HELLOEV-1001, KABIRA-9876). Prefix can be uppercase letters or numbers.')
      ],
    }),
    // --- END NEW FIELD ---
    defineField({
      name: 'image',
      title: 'Dealer Image',
      type: 'image',
      description: 'Upload a primary photo for the dealership.',
      group: 'details',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'contact',
      group: 'details',
      description: 'How customers can reach the dealership.',
    }),
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      group: 'details',
      description: 'Select all services provided at this location.',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Sales', value: 'sales'},
          {title: 'Service', value: 'service'},
          {title: 'Charging', value: 'charging'},
          {title: 'Test Rides', value: 'test-rides'},
        ],
        layout: 'tags',
      },
    }),

    // Location Group
    defineField({
      name: 'address',
      title: 'Address',
      type: 'address',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      group: 'location',
      description: 'Precise location for map display. Click the map to set.',
      options: {
        withAltitude: false,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Hours Group
    defineField({
      name: 'hours',
      title: 'Operating Hours',
      type: 'array',
      group: 'hours',
      description: 'Specify opening and closing times for each day. Defaults to Mon-Sat 9-6, Sun Closed.',
      of: [{type: 'dealerHours'}],
      initialValue: defaultDealerHours,
      validation: Rule => Rule.unique().error('Each day can only be listed once.'),
    }),

    // Meta Group
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      group: 'meta',
      description: 'Is this dealer currently operational and listed publicly?',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Highlight this dealer in listings or maps?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      dealerCode: 'dealerCode', // Select the dealer code for preview
      city: 'address.city',
      state: 'address.state',
      media: 'image',
    },
     prepare({title, dealerCode, city, state, media}) {
      const location = [city, state].filter(Boolean).join(', ')
      const subtitle = dealerCode ? `${dealerCode} | ${location}` : location; // Add code to subtitle
      return {
        title: title || 'Untitled Dealer',
        subtitle: subtitle,
        media: media || PinIcon,
      }
    },
  },
})
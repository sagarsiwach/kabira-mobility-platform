import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import {indianStates} from '../constants' // Ensure this path is correct

export default defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'line1',
      title: 'Address Line 1',
      type: 'string',
      description: 'Street address, P.O. box, company name, c/o',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'line2',
      title: 'Address Line 2',
      type: 'string',
      description: 'Apartment, suite, unit, building, floor, etc.',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State / Province / Territory',
      type: 'string',
      options: {
        list: indianStates, // Use the imported list for a dropdown
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pincode',
      title: 'Pincode',
      type: 'string',
      description: '6-digit Indian Postal Index Number.',
      validation: (Rule) => Rule.required().regex(/^\d{6}$/, 'Must be a valid 6-digit pincode'),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'India',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Assuming only India for now
    }),
  ],
  preview: {
    select: {
      line1: 'line1',
      city: 'city',
      state: 'state',
      pincode: 'pincode',
    },
    prepare({line1, city, state, pincode}) {
      const location = [city, state, pincode].filter(Boolean).join(', ')
      return {
        title: line1 || 'Address not specified',
        subtitle: location || 'No location details',
      }
    },
  },
})

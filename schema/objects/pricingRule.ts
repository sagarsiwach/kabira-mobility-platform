import {defineType, defineField} from 'sanity'
import {BillIcon} from '@sanity/icons'
import {indianStates} from '../constants' // Ensure this path is correct

export default defineType({
  name: 'pricingRule',
  title: 'State Pricing Rule',
  type: 'object',
  icon: BillIcon,
  description: 'Defines the base vehicle price and fees for a specific state.',
  fields: [
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: indianStates,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (Ex-Showroom) (₹)',
      type: 'number',
      description: 'The base ex-showroom price for the model in this state.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'fulfillmentFee',
      title: 'Fulfillment Fee (₹)',
      type: 'number',
      description: 'Handling, logistics, or other fees applicable in this state.',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      state: 'state',
      basePrice: 'basePrice',
      fulfillmentFee: 'fulfillmentFee',
    },
    prepare({state, basePrice, fulfillmentFee}) {
      const fees = fulfillmentFee > 0 ? ` (+₹${fulfillmentFee} Fee)` : ''
      return {
        title: state || 'No State Selected',
        subtitle: `Base Price: ₹${basePrice ?? 0}${fees}`,
      }
    },
  },
})

import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

const componentTypes = [
  {title: 'Accessory', value: 'ACCESSORY'},
  {title: 'Package', value: 'PACKAGE'},
  {title: 'Warranty', value: 'WARRANTY'},
  {title: 'Service', value: 'SERVICE'},
]

export default defineType({
  name: 'componentOption',
  title: 'Component / Package / Service',
  type: 'object',
  icon: CogIcon,
  description: 'Represents an add-on, package, warranty, or service option.',
  fields: [
    defineField({
      name: 'componentType',
      title: 'Type',
      type: 'string',
      options: {
        list: componentTypes,
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'ACCESSORY',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'slug',
      description: 'Unique identifier (e.g., B10-HELMET, COMMON-EXTENDED-2Y). Auto-generated.',
      options: {
        // Improved source logic to handle potential undefined parent properties gracefully
        source: (doc, context) => {
          // Ensure context.parent and its properties exist before accessing them
          const parentModelCode = context.parent && (context.parent as any).modelCode?.current
          const title = doc.title || 'COMPONENT'
          return `${parentModelCode || 'CODE'}-${title}`
        },
        slugify: (input) => input.toUpperCase().replace(/[^A-Z0-9-]+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'e.g., Helmet, Smart Connectivity Package',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      placeholder: 'e.g., Mandatory Accessory, 05 Years / 60,000kms',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Detailed explanation of the component or service.',
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isRequired',
      title: 'Is Required?',
      type: 'boolean',
      description: 'Check if this component/service is mandatory.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'componentType',
      code: 'code.current',
      price: 'price',
      isRequired: 'isRequired',
    },
    prepare({title, type, code, price, isRequired}) {
      const requiredMarker = isRequired ? ' (Required)' : ''
      return {
        title: `${title || 'Untitled'}${requiredMarker}`,
        subtitle: `${type || '?'} - ₹${price ?? 0}`,
      }
    },
  },
})

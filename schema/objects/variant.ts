import {defineType, defineField} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export default defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  icon: ControlsIcon,
  description: 'Defines a specific version of a vehicle model (e.g., range, battery).',
  fields: [
    defineField({
      name: 'code',
      title: 'Variant Code',
      type: 'slug',
      description: 'Unique identifier for this variant (e.g., B10-LONG-RANGE). Auto-generated.',
      options: {
        source: (doc, context) => `${context.parent?.modelCode?.current || 'CODE'}-${doc.title || 'VARIANT'}`, // Generate from model code + title
        slugify: (input) => input.toUpperCase().replace(/[^A-Z0-9-]+/g, '-'), // Ensure valid format
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'e.g., Long Range',
      description: 'Human-readable name for the variant.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      placeholder: 'e.g., 5.14 kWh Battery Pack',
      description: 'Short description highlighting the key feature.',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'string',
      placeholder: 'e.g., 202 kms Range (IDC)',
      description: 'More details about the variant, often includes range.',
    }),
    defineField({
      name: 'priceAddition',
      title: 'Price Addition (₹)',
      type: 'number',
      description: 'Cost added to the model base price for this variant (0 if standard).',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'batteryCapacity',
      title: 'Battery Capacity (kWh)',
      type: 'number',
      description: 'Nominal battery capacity in kilowatt-hours.',
    }),
    defineField({
      name: 'rangeKm',
      title: 'Range (km)',
      type: 'number',
      description: 'Estimated range in kilometers (specify standard if applicable, e.g., IDC).',
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default Variant?',
      type: 'boolean',
      description: 'Mark one variant as the default selection for the model.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      code: 'code.current',
      price: 'priceAddition',
      isDefault: 'isDefault',
    },
    prepare({title, subtitle, code, price, isDefault}) {
      const defaultMarker = isDefault ? ' (Default)' : ''
      const priceInfo = price > 0 ? ` (+₹${price})` : ''
      return {
        title: `${title || 'Untitled Variant'}${defaultMarker}`,
        subtitle: `${subtitle || code || ''}${priceInfo}`,
      }
    },
  },
})
// schema/objects/variant.ts
import {defineType, defineField} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

// Interface for prepare selection
interface VariantPreviewSelection {
  title?: string
  subtitle?: string
  code?: string
  price?: number
  isDefault?: boolean
}

export default defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  icon: ControlsIcon,
  description:
    'Defines a specific version of a vehicle model (e.g., based on range, battery). Code must be unique within the model.',
  fields: [
    defineField({
      name: 'code',
      title: 'Variant Code',
      type: 'slug',
      description:
        'REQUIRED: Unique identifier for this variant (e.g., "STD", "LR"). Auto-generated from Title. Used for filtering specs/features.',
      options: {
        source: 'title',
        maxLength: 20,
        slugify: (input) =>
          input
            .toUpperCase()
            .replace(/\s+/g, '-')
            .replace(/[^A-Z0-9-]/g, ''), // Allow uppercase, numbers, hyphens
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'e.g., Standard Range, Long Range',
      description: 'Human-readable name for the variant.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (Optional)',
      type: 'string',
      placeholder: 'e.g., 4.0 kWh Battery, Performance Pack',
      description: 'Short description highlighting the key differentiating feature.',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description (Optional)',
      type: 'string',
      placeholder: 'e.g., Est. 180 kms Range (IDC)',
      description: 'More details about the variant, often includes range or key spec.',
    }),
    defineField({
      name: 'priceAddition',
      title: 'Price Addition vs Base (₹)',
      type: 'number',
      description:
        "Cost added to the model's base price for this variant (use 0 if this IS the base variant).",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'batteryCapacity',
      title: 'Battery Capacity (kWh) (Optional)',
      type: 'number',
      description: 'Nominal battery capacity in kilowatt-hours, if different for this variant.',
      validation: (Rule) => Rule.min(0), // Add basic validation
    }),
    defineField({
      name: 'rangeKm',
      title: 'Range (km) (Optional)',
      type: 'number',
      description:
        'Estimated range in kilometers (specify standard if applicable, e.g., IDC), if different for this variant.',
      validation: (Rule) => Rule.min(0), // Add basic validation
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default Variant?',
      type: 'boolean',
      description: 'Mark ONE variant as the default selection for the model.',
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
    prepare(selection: VariantPreviewSelection) {
      const {title, subtitle, code, price, isDefault} = selection
      const defaultMarker = isDefault ? ' (Default)' : ''
      const priceInfo = typeof price === 'number' && price > 0 ? ` (+₹${price})` : ''
      return {
        title: `${title || 'Untitled Variant'}${defaultMarker}`,
        subtitle: `${code ? `[${code}] ` : ''}${subtitle || ''}${priceInfo}`,
      }
    },
  },
})

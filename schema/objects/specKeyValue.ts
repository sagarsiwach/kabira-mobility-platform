// schema/objects/specKeyValue.ts
import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'specKeyValue',
  title: 'Specification (Key-Value)',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'key',
      title: 'Specification Name / Title',
      type: 'string',
      description: 'The name/title of the specification (e.g., "Range (IDC)", "Top Speed")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value / Subtitle',
      type: 'string',
      description:
        'The specification value or subtitle text (e.g., "202 km", "90 km/h", "5.14 kWh")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit (Optional)',
      type: 'string',
      description: 'Optional: Unit of measurement if not included in Value (e.g., "km", "km/h")',
    }),
    defineField({
      name: 'variantCodes',
      title: 'Applicable Variants (Optional)',
      type: 'array',
      description:
        'If this spec differs per variant, list the relevant Variant Codes (e.g., "B10-LONG-RANGE"). Leave empty if it applies to all variants of the model.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  preview: {
    select: {
      key: 'key',
      value: 'value',
      unit: 'unit',
      variants: 'variantCodes',
    },
    prepare({key, value, unit, variants}) {
      const val = unit ? `${value} ${unit}` : value
      const suffix =
        variants && (variants as string[]).length > 0
          ? ` (${variants.join(', ')})`
          : ' (All Variants)'
      return {
        title: key || 'Untitled Spec',
        subtitle: `${val || 'No value'}${suffix}`,
      }
    },
  },
})

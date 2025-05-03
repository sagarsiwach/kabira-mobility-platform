// schema/objects/specSimpleListItem.ts (NEW)
import {defineField, defineType} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons' // Or ListIcon

export default defineType({
  name: 'specSimpleListItem',
  title: 'Specification (Simple List Item)',
  type: 'object',
  icon: CheckmarkIcon,
  description: 'A single line item for lists like Features or Connectivity.',
  fields: [
    defineField({
      name: 'itemName',
      title: 'Item Name / Feature',
      type: 'string',
      description: 'The text for the list item (e.g., "Bluetooth Connectivity", "Geo-fencing")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variantCodes',
      title: 'Applicable Variants (Optional)',
      type: 'array',
      description:
        'If this feature is only on specific variants, list their Variant Codes. Leave empty if applies to all.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  preview: {
    select: {
      title: 'itemName',
      variants: 'variantCodes',
    },
    prepare({title, variants}) {
      const suffix =
        variants && variants.length > 0 ? ` (${variants.join(', ')})` : ' (All Variants)'
      return {
        title: title || 'Untitled Item',
        subtitle: `Simple List Item${suffix}`,
      }
    },
  },
})

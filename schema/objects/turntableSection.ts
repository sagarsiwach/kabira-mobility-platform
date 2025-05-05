// schema/objects/turntableSection.ts (MODIFIED - Rename from .jsx)
import {defineField, defineType} from 'sanity'
import {SyncIcon} from '@sanity/icons'

export default defineType({
  name: 'turntableSection',
  title: '360 Turntable Section', // Renamed
  type: 'object',
  icon: SyncIcon,
  description: 'Displays the 360 turntable using data from the linked Vehicle.',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (Optional)',
      type: 'string',
      description: 'Optional heading for the turntable section (e.g., "360° View").',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle (Optional)',
      type: 'string',
      description: 'Optional short text displayed below the section title.',
    }),
    // REMOVED: modelCode, frameCount, colors - These should be fetched from the linked vehicle document
    defineField({
      name: 'autoRotate', // Keep control if desired
      title: 'Enable Auto-rotate on Load?',
      type: 'boolean',
      description: 'Should the turntable automatically rotate initially?',
      initialValue: true,
    }),
    // Optional: Add controls for speed etc. if they need to be block-specific overrides
    // defineField({ name: 'rotationSpeedOverride', title: 'Rotation Speed Override', type: 'number', ... })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || '360 Turntable Section',
        subtitle: 'Uses data from linked Vehicle',
        media: SyncIcon,
      }
    },
  },
})

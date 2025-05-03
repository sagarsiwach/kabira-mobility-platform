// schema/objects/configuratorData.ts
import {defineField, defineType} from 'sanity'
import {DesktopIcon, MobileDeviceIcon, TabletIcon} from '@sanity/icons' // Import relevant icons

export default defineType({
  name: 'configuratorData',
  title: 'Configurator Data (Responsive)', // Updated title
  type: 'object',
  icon: DesktopIcon,
  groups: [
    // Use groups for better organization
    {name: 'general', title: 'General Info', default: true},
    {name: 'configLg', title: 'Large Desktop (LG)'},
    {name: 'configMd', title: 'Medium Desktop (MD)'},
    {name: 'configTablet', title: 'Tablet'},
    {name: 'configPhone', title: 'Phone'},
  ],
  fields: [
    // --- General Info ---
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      group: 'general',
      description: 'Heading for the configurator section (e.g., "Explore in 3D")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      group: 'general',
      rows: 3,
      description: 'Optional brief text introducing the configurator.',
    }),

    // --- Large Desktop Config ---
    defineField({
      name: 'configLg', // Use descriptive names
      title: 'LG Config Data (> 1199px)', // Specify breakpoint range
      type: 'code',
      group: 'configLg', // Assign to group
      description: 'JSON configuration specifically for large desktop screens.',
      options: {
        language: 'json',
        theme: 'monokai', // Optional: set theme
      },
      validation: (Rule) => Rule.required().error('Large Desktop config is required.'),
    }),

    // --- Medium Desktop Config ---
    defineField({
      name: 'configMd',
      title: 'MD Config Data (992px - 1199px)',
      type: 'code',
      group: 'configMd',
      description: 'JSON configuration for medium desktop/laptop screens.',
      options: {language: 'json', theme: 'monokai'},
      validation: (Rule) => Rule.required().error('Medium Desktop config is required.'),
    }),

    // --- Tablet Config ---
    defineField({
      name: 'configTablet',
      title: 'Tablet Config Data (768px - 991px)',
      type: 'code',
      group: 'configTablet',
      description: 'JSON configuration for tablet screens.',
      options: {language: 'json', theme: 'monokai'},
      validation: (Rule) => Rule.required().error('Tablet config is required.'),
    }),

    // --- Phone Config ---
    defineField({
      name: 'configPhone',
      title: 'Phone Config Data (< 768px)',
      type: 'code',
      group: 'configPhone',
      description: 'JSON configuration for mobile phone screens.',
      options: {language: 'json', theme: 'monokai'},
      validation: (Rule) => Rule.required().error('Phone config is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      hasLg: 'configLg.code', // Check if code exists for preview indication
      hasMd: 'configMd.code',
      hasTablet: 'configTablet.code',
      hasPhone: 'configPhone.code',
    },
    prepare({title, hasLg, hasMd, hasTablet, hasPhone}) {
      const configured = [hasLg, hasMd, hasTablet, hasPhone].filter(Boolean).length
      return {
        title: title || 'Responsive Configurator',
        subtitle: `${configured} / 4 Breakpoints Configured`,
        icon: DesktopIcon, // Keep a general icon
      }
    },
  },
})

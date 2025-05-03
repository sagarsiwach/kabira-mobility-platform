// schema/singletons/navigationSettings.ts
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title (for reference)',
      type: 'string',
      initialValue: 'Kabira Mobility',
      readOnly: true,
    }),
    defineField({
      name: 'desktopMenuItems',
      title: 'Desktop Menu Items',
      type: 'array',
      description: 'Add and configure top-level items for the desktop navigation bar.',
      of: [{type: 'navMenuItem'}],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one desktop menu item is required.'),
    }),
    defineField({
      name: 'mobileMenuItems',
      title: 'Mobile Menu Root Items',
      type: 'array',
      description: 'Add and configure root items shown when the mobile menu first opens.',
      of: [{type: 'mobileMenuItem'}],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one mobile menu item is required.'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
      }
    },
  },
})

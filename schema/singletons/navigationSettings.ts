// schema/singletons/navigationSettings.ts
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons' // Use an appropriate icon

export default defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: MenuIcon,
  // Disallow creating new instances, make it a singleton
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title (for reference)',
      type: 'string',
      initialValue: 'Kabira Mobility', // Keep initial value for simple fields
      readOnly: true,
    }),
    // --- Logo fields removed as requested ---

    defineField({
      name: 'desktopMenuItems',
      title: 'Desktop Menu Items',
      type: 'array',
      description: 'Top-level items shown in the desktop navigation bar.',
      of: [{type: 'navMenuItem'}],
      // REMOVED initialValue array
      validation: (Rule) =>
        Rule.required().min(1).error('At least one desktop menu item is required.'), // Added validation
    }),
    defineField({
      name: 'mobileMenuItems',
      title: 'Mobile Menu Root Items',
      type: 'array',
      description: 'Root items shown when the mobile menu first opens.',
      of: [
        {
          type: 'object',
          name: 'mobileRootItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasChildren',
              title: 'Has Submenu?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'url',
              title: 'Direct Link URL (Optional)',
              type: 'string',
              hidden: ({parent}) => parent?.hasChildren === true,
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Optional)',
              type: 'string',
              options: {
                list: [
                  {title: 'Arrow Right', value: 'right'},
                  {title: 'Arrow Top Right', value: 'topRight'},
                  {title: 'More Horizontal', value: 'more'},
                ],
              },
            }),
          ],
          preview: {
            select: {title: 'label', hasChildren: 'hasChildren', url: 'url'},
            prepare({title, hasChildren, url}) {
              const subtitle = hasChildren ? 'Opens Submenu' : url || 'No Link'
              return {title, subtitle}
            },
          },
        },
      ],
      // REMOVED initialValue array
      validation: (Rule) =>
        Rule.required().min(1).error('At least one mobile menu item is required.'), // Added validation
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

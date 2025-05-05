// schema/singletons/navigationSettings.ts (Refactored - REPLACE content)
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: MenuIcon,
  groups: [
    {name: 'desktop', title: 'Desktop Menu', default: true},
    {name: 'mobile', title: 'Mobile Menu'},
    {name: 'dropdownContent', title: 'Dropdown Content'},
  ],
  fields: [
    // --- Desktop Group ---
    defineField({
      name: 'desktopNavItems',
      title: 'Desktop Top Bar Items',
      type: 'array',
      group: 'desktop',
      description:
        'Items appearing directly in the main desktop navigation bar. Define which ones open a dropdown.',
      of: [
        {
          type: 'object',
          name: 'desktopNavItem',
          title: 'Desktop Nav Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Display Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'opensDropdown',
              title: 'Opens Dropdown?',
              type: 'string',
              description: 'Select which dropdown this item should open, or None.',
              options: {
                list: [
                  {title: 'None (Direct Link)', value: 'none'},
                  {title: 'Motorbikes', value: 'motorbikes'},
                  {title: 'Scooters', value: 'scooters'},
                  {title: 'More', value: 'more'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'none',
            }),
            defineField({
              name: 'link',
              title: 'Direct Link (if Opens Dropdown is None)',
              type: 'link', // Simplified link
              description: 'Set the destination ONLY if this item is a direct link.',
              hidden: ({parent}) => parent?.opensDropdown !== 'none',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.parent?.opensDropdown === 'none' && !value?._type) {
                    return 'Link Destination is required for Direct Link items.'
                  }
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              opensDropdown: 'opensDropdown',
              linkType: 'link.linkType',
            },
            prepare({title, opensDropdown, linkType}) {
              const subtitle =
                opensDropdown !== 'none'
                  ? `Opens: ${opensDropdown}`
                  : `Direct Link (${linkType || 'Not Set'})`
              return {title: title || 'Untitled Item', subtitle}
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // --- Mobile Group ---
    defineField({
      name: 'mobileNavItems',
      title: 'Mobile Root Menu Items',
      type: 'array',
      group: 'mobile',
      description:
        'Root items shown when the mobile menu opens. Define which ones trigger a submenu.',
      of: [
        {
          type: 'object',
          name: 'mobileNavItem',
          title: 'Mobile Nav Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Display Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'triggersSubmenu',
              title: 'Triggers Submenu?',
              type: 'string',
              description: 'Select which submenu this item should trigger, or None.',
              options: {
                list: [
                  {title: 'None (Direct Link)', value: 'none'},
                  {title: 'Motorbikes', value: 'motorbikes'},
                  {title: 'Scooters', value: 'scooters'},
                  {title: 'More', value: 'more'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'none',
            }),
            defineField({
              name: 'link',
              title: 'Direct Link (if Triggers Submenu is None)',
              type: 'link', // Simplified link
              description: 'Set the destination ONLY if this item is a direct link.',
              hidden: ({parent}) => parent?.triggersSubmenu !== 'none',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.parent?.triggersSubmenu === 'none' && !value?._type) {
                    return 'Link Destination is required for Direct Link items.'
                  }
                  return true
                }),
            }),
            // Optional Icon Field - Add if needed
            // defineField({
            //   name: 'iconHint',
            //   title: 'Icon Hint (Optional)',
            //   type: 'string',
            //   options: { list: ['default', 'external', 'submenu', 'more', 'none'] },
            //   description: "Hint for frontend icon rendering based on type."
            // })
          ],
          preview: {
            select: {
              title: 'title',
              triggersSubmenu: 'triggersSubmenu',
              linkType: 'link.linkType',
            },
            prepare({title, triggersSubmenu, linkType}) {
              const subtitle =
                triggersSubmenu !== 'none'
                  ? `Triggers: ${triggersSubmenu}`
                  : `Direct Link (${linkType || 'Not Set'})`
              return {title: title || 'Untitled Item', subtitle}
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // --- Dropdown Content Group ---
    defineField({
      name: 'motorbikeDropdownLinks',
      title: 'Motorbikes Dropdown Content',
      type: 'array',
      group: 'dropdownContent',
      description: 'Links shown in the "Motorbikes" dropdown.',
      of: [{type: 'vehicleDropdownLink'}], // Use the new object type
    }),
    defineField({
      name: 'scooterDropdownLinks',
      title: 'Scooters Dropdown Content',
      type: 'array',
      group: 'dropdownContent',
      description: 'Links shown in the "Scooters" dropdown.',
      of: [{type: 'vehicleDropdownLink'}], // Use the new object type
    }),
    defineField({
      name: 'moreDropdownLinks',
      title: 'More Dropdown Content',
      type: 'array',
      group: 'dropdownContent',
      description: 'Links shown in the "More" dropdown, organized by group number.',
      of: [{type: 'groupedLink'}], // Use the new object type
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

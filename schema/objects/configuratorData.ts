// schema/objects/configuratorData.ts

import {defineField, defineType} from 'sanity'
import {DesktopIcon} from '@sanity/icons'

export default defineType({
  name: 'configuratorData',
  title: 'Configurator Data',
  type: 'object',
  icon: DesktopIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the configurator section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      description: 'Brief text introducing the configurator',
    }),
    defineField({
      name: 'desktopConfigData',
      title: 'Desktop Configuration Data',
      type: 'code',
      description: 'JSON data for the desktop version of the configurator',
      options: {
        language: 'json',
        theme: 'monokai',
        withFilename: false,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileConfigData',
      title: 'Mobile Configuration Data',
      type: 'code',
      description: 'JSON data for the mobile version of the configurator',
      options: {
        language: 'json',
        theme: 'monokai',
        withFilename: false,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})

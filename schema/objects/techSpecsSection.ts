// schema/objects/techSpecsSection.ts

import {defineField, defineType} from 'sanity'
import {MasterDetailIcon} from '@sanity/icons'

export default defineType({
  name: 'techSpecsSection',
  title: 'Technical Specifications',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'showModelHeader',
      title: 'Show Model Header',
      type: 'boolean',
      description: 'Whether to display the model name and image header',
      initialValue: true,
    }),
    defineField({
      name: 'modelName',
      title: 'Model Name',
      type: 'string',
      description: 'The model designation shown in the header',
      hidden: ({parent}) => !parent?.showModelHeader,
    }),
    defineField({
      name: 'modelSubline',
      title: 'Model Subline',
      type: 'string',
      description: 'Secondary text shown below model name (e.g., price range)',
      hidden: ({parent}) => !parent?.showModelHeader,
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Optional image displayed in the header section',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => !parent?.showModelHeader,
    }),
    defineField({
      name: 'specSections',
      title: 'Specification Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specSection',
          fields: [
            defineField({
              name: 'id',
              title: 'Section ID',
              type: 'string',
              description:
                'Unique identifier for this spec section (system will generate if not provided)',
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Heading for this group of specifications',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Key/Value Pair', value: 'keyValue'},
                  {title: 'Key/Value Grid', value: 'keyValueGrid'},
                  {title: 'Color Swatches', value: 'colorSwatch'},
                  {title: 'Icon Grid', value: 'iconGrid'},
                  {title: 'Simple List', value: 'simpleList'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Specification Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'specItem',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      description: 'The name/label of the specification (optional for some types)',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      description: 'The value, URL, or hex color code depending on section type',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text / Tooltip',
                      type: 'string',
                      description: 'Alternative text or tooltip (used for colors and icons)',
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              itemCount: 'items.length',
            },
            prepare({title, type, itemCount = 0}) {
              return {
                title: title || 'Untitled Section',
                subtitle: `${type || 'Unknown type'} • ${itemCount} item${itemCount === 1 ? '' : 's'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})

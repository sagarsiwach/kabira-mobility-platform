// schema/objects/configuratorSetup.ts
import {
    defineField,
    defineType,
    Slug,
    ColorValue, // Use ColorValue for the type from @sanity/color-input
    defineArrayMember,
    NumberRule, // Import specific rule types
    ArrayRule,
    StringRule,
    SlugRule,
    ObjectRule,
    BooleanRule,
    CustomValidator, // Import CustomValidator for complex rules
} from 'sanity'
import {DashboardIcon, DropIcon} from '@sanity/icons'
import React from 'react' // Import React

// Interface for array item data (can be simplified if not used elsewhere)
interface ConfiguratorColorItem {
  _key: string
  name?: string
  colorSlug?: Slug
  colorValue?: ColorValue // Use imported type
  isDefault?: boolean
}

export default defineType({
  name: 'configuratorSetup',
  title: 'Configurator Core Setup',
  type: 'object',
  icon: DashboardIcon,
  description:
    'REQUIRED technical settings for the 360° image sequence: total frame count & available color slugs/swatches. This data MUST match the assets in storage.',
  fields: [
    defineField({
      name: 'frameCount',
      title: 'Image Sequence Frame Count',
      type: 'number',
      description:
        'REQUIRED: The exact total number of images in the 360° sequence (e.g., 72, 360). Must match the number of files per color in storage.',
      // Use the specific NumberRule
      validation: (Rule: NumberRule) =>
        Rule.required()
          .integer()
          .positive()
          .error('Frame count must be a positive whole number.'),
    }),
    defineField({
      name: 'availableColors',
      title: 'Available Configurator Colors',
      type: 'array',
      description:
        'Define colors for the UI switcher. "Color Slug" MUST exactly match the folder names in storage: `.../processed_images/{modelCode}/{colorSlug}`. Mark ONE color as default.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'configuratorColor',
          title: 'Configurator Color',
          icon: DropIcon,
          fields: [
            defineField({
              name: 'name',
              title: 'Display Name',
              type: 'string',
              description: 'Name shown in the UI (e.g., "Glossy Red"). Must be unique.',
              // Use StringRule
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'colorSlug',
              title: 'Color Slug (for Image Path)',
              type: 'slug',
              description:
                'REQUIRED: Must match the storage folder name (e.g., "glossy-red", "matte-black"). Case-sensitive if storage is. Auto-generates from Display Name. Must be unique.',
              options: {
                source: 'name',
                maxLength: 50,
                slugify: (input) =>
                  input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, ''),
              },
              // Use SlugRule
              validation: (Rule: SlugRule) =>
                Rule.required().error(
                  'Color Slug matching the folder name is required for image paths.',
                ),
            }),
            defineField({
              name: 'colorValue',
              title: 'Swatch Color',
              type: 'color',
              description: 'Color used for the UI swatch.',
              options: {disableAlpha: true},
              // Use ObjectRule (or specific ColorRule if available from plugin types)
              validation: (Rule: ObjectRule) => Rule.required(),
            }),
            defineField({
              name: 'isDefault',
              title: 'Is Default Color?',
              type: 'boolean',
              description: 'Mark ONE color as the default displayed when the configurator loads.',
              initialValue: false,
              // Use BooleanRule if needed, though often not required for boolean validation
              // validation: (Rule: BooleanRule) => Rule...,
            }),
          ],
          preview: {
            select: {
              name: 'name',
              slug: 'colorSlug.current',
              color: 'colorValue.hex',
              isDefault: 'isDefault',
            },
            prepare(selection: { name?: string; slug?: string; color?: string; isDefault?: boolean }) {
                const { name, slug, color, isDefault } = selection;
                return {
                    title: `${name || 'Unnamed Color'} ${isDefault ? '(Default)' : ''}`,
                    subtitle: `Slug: ${slug || 'N/A'} | Swatch: ${color || 'N/A'}`,
                    media: () => color ? <div style={{ backgroundColor: color, width: '100%', height: '100%', borderRadius: '50%' }} /> : <DropIcon />, // Use function returning JSX
                }
            },
          },
        }),
      ],
      // Use ArrayRule and CustomValidator
      validation: (Rule: ArrayRule<ConfiguratorColorItem>) => [
          Rule.required().min(1).error('Define at least one color.'),
          Rule.custom((colors: ConfiguratorColorItem[] | undefined): true | string => {
            if (!colors) return true
            const defaultColors = colors.filter((c) => c?.isDefault)
            if (defaultColors.length === 0) return 'One color must be marked as default.'
            if (defaultColors.length > 1) return 'Only one color can be marked as default.'
            const names = colors.map(c => c?.name).filter(Boolean);
            if (new Set(names).size !== names.length) {
                return 'Configurator Color display names must be unique.';
            }
            const slugs = colors.map(c => c?.colorSlug?.current).filter(Boolean);
            if (new Set(slugs).size !== slugs.length) {
                return 'Configurator Color slugs must be unique.';
            }
            return true
          }).error('Validation Failed: Ensure exactly one default color and unique names/slugs.'),
          // Rule.unique() on array checks uniqueness of the whole object based on _key, less useful for property checks
      ],
    }),
  ],
  preview: {
    select: {
      frameCount: 'frameCount',
      colors: 'availableColors',
    },
    prepare({frameCount, colors}: {frameCount?: number, colors?: ConfiguratorColorItem[]}) {
      const colorCount = colors?.length || 0
      return {
        title: '360 Configurator Setup',
        subtitle: `${frameCount || 'N/A'} frames, ${colorCount} color(s) defined`,
        icon: DashboardIcon,
      }
    },
  },
})
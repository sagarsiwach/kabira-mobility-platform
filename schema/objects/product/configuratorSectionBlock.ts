// schema/objects/product/configuratorSectionBlock.ts
import {
  defineField,
  defineType,
  // Import the specific rule types needed
  StringRule,
  NumberRule,
  SlugRule,
  ArrayRule,
  CustomValidator,
  Rule, // Keep the base Rule for generic required checks if needed
} from 'sanity'
import {ControlsIcon, DropIcon} from '@sanity/icons'

// Interfaces remain helpful for clarity
interface ConfiguratorColor {
  _key?: string
  _type?: string
  name?: string
  slug?: {current?: string}
  isDefault?: boolean
  colorValue?: {hex?: string}
}

interface BlockPreviewSelection {
  title?: string
  modelCode?: string
  colorCount?: number
}

// Define the custom validation function with explicit types
const validateColorsArray: CustomValidator<ConfiguratorColor[] | undefined> = (colors, context) => {
  if (!colors || colors.length === 0) return true

  const defaultColors = colors.filter((c) => c?.isDefault)
  if (defaultColors.length !== 1) {
    return 'Exactly one color must be marked as default.'
  }

  const slugs = colors.map((c) => c?.slug?.current).filter(Boolean)
  if (new Set(slugs).size !== slugs.length) {
    return 'Color slugs must be unique within this block.'
  }

  const names = colors.map((c) => c?.name).filter(Boolean)
  if (new Set(names).size !== names.length) {
    return 'Color names must be unique within this block.'
  }

  return true
}

export default defineType({
  name: 'configuratorSectionBlock',
  title: '360 Configurator Block',
  type: 'object',
  icon: ControlsIcon,
  groups: [
    {name: 'config', title: 'Core Configuration', default: true},
    {name: 'display', title: 'Display Text (Optional)'},
  ],
  fields: [
    // --- Core Configuration Group ---
    defineField({
      name: 'modelCode',
      title: 'Model Code (for Image Path)',
      type: 'string',
      group: 'config',
      description:
        'REQUIRED: Exact folder name used in image storage (e.g., "km3000"). Case-sensitive if storage is. MUST match assets.',
      // Correct validation type for string
      validation: (Rule: StringRule) =>
        Rule.required().error('Model Code is required for image paths.'),
    }),
    defineField({
      name: 'frameCount',
      title: 'Frame Count',
      type: 'number',
      group: 'config',
      description: 'REQUIRED: Total number of images in the 360 sequence (e.g., 360).',
      // Correct validation type for number
      validation: (Rule: NumberRule) =>
        Rule.required().integer().min(1).error('Frame count must be at least 1.'),
    }),
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      group: 'config',
      description:
        'REQUIRED: Define the colors available in the configurator. Slugs MUST match image storage folder names.',
      of: [
        {
          name: 'configuratorColor',
          title: 'Color',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Color Name',
              type: 'string',
              description: 'Display name (e.g., "Glossy Red")',
              // Correct validation type for string
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Color Slug (for Image Path)',
              type: 'slug',
              options: {
                source: 'name',
                slugify: (input: string): string =>
                  input
                    .toLowerCase()
                    .replace(/\s+/g, '_')
                    .replace(/[^a-z0-9_]/g, ''),
              },
              description:
                'REQUIRED: Auto-generated from name. MUST match the color folder name in image storage (e.g., "glossy_red"). Check and adjust if needed.',
              // Correct validation type for slug
              validation: (Rule: SlugRule) => Rule.required(),
            }),
            defineField({
              name: 'colorValue',
              title: 'Color Swatch Value (Optional)',
              type: 'color',
              description: 'Select the approximate color for reference (optional).',
              options: {disableAlpha: true},
            }),
            defineField({
              name: 'isDefault',
              title: 'Is Default Color?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          // --- FINAL SIMPLIFIED PREVIEW (NO JSX) ---
          preview: {
            select: {
              name: 'name',
              slug: 'slug.current',
              isDefault: 'isDefault',
              // No need to select colorValue.hex if not using it
            },
            prepare(selection: Omit<ConfiguratorColor, 'colorValue'>) {
              // Use Omit again
              const {name, slug, isDefault} = selection
              const title = `${name || 'Unnamed Color'} ${isDefault ? '(Default)' : ''}` // Added fallback name
              const subtitle = `Slug: ${slug?.current || 'N/A'}`
              // Use DropIcon consistently
              return {title, subtitle, media: DropIcon}
            },
          },
        },
      ],
      // Correct validation definition for array field
      validation: (Rule: ArrayRule<ConfiguratorColor>) => [
        Rule.required().min(1).error('At least one color must be defined.'),
        Rule.custom(validateColorsArray), // Reference the custom validator function
      ],
    }),

    // --- Display Text Group ---
    defineField({
      name: 'sectionTitle',
      title: 'Section Title (Optional)',
      type: 'string',
      group: 'display',
      description: 'Optional title displayed above the configurator.',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle (Optional)',
      type: 'string',
      group: 'display',
      description: 'Optional subtitle displayed below the title (e.g., "Drag to Interact").',
      initialValue: 'Drag to Interact',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      modelCode: 'modelCode',
      colorCount: 'colors.length',
    },
    prepare(selection: BlockPreviewSelection) {
      const {title, modelCode, colorCount} = selection
      return {
        title: title || '360 Configurator Block',
        subtitle: `${modelCode || 'No Model Code'} | ${colorCount || 0} Colors`,
        media: ControlsIcon,
      }
    },
  },
})

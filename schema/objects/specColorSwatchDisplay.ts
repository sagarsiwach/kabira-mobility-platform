// schema/objects/specColorSwatchDisplay.ts
import {defineType, defineField} from 'sanity'
import {DropIcon} from '@sanity/icons' // Keep the icon for the schema type itself

export default defineType({
  name: 'specColorSwatchDisplay', // Make sure this name is unique if needed
  title: 'Spec: Color Swatch Display',
  type: 'object',
  icon: DropIcon, // Icon shown in the schema list
  description: 'Displays a color swatch within the Technical Specifications list.',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      description: 'The name of the color (e.g., "Midnight Black").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color', // Field storing the hex code (e.g., #000000)
      title: 'Color Hex Code',
      type: 'string', // Use 'string' if just pasting hex, or 'color' if using the color picker plugin
      description: 'The hex code for the color (e.g., "#000000"). Include the #.',
      validation: (Rule) =>
        Rule.required().regex(
          /^#[0-9A-Fa-f]{6}$/,
          'Must be a valid 6-digit hex code starting with #',
        ),
    }),
    defineField({
      name: 'altText', // Still good practice for potential frontend use
      title: 'Alt Text (Optional)',
      type: 'string',
      description:
        'Brief description of the color for accessibility (e.g., "Glossy black swatch").',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix (Optional)',
      type: 'string',
      description: 'Optional text appended to the name (e.g., "(Glossy)", "(Matte)").',
    }),
  ],
  // --- SIMPLIFIED PREVIEW ---
  preview: {
    select: {
      name: 'name',
      color: 'color', // Select the field containing the hex code
      suffix: 'suffix',
    },
    prepare({name, color, suffix}) {
      const displaySuffix = suffix ? ` ${suffix}` : ''
      // Only return title and subtitle - Sanity will use the default 'icon' for media
      return {
        title: name || 'Untitled Color',
        subtitle: `${color || 'No hex code'}${displaySuffix}`, // Show the hex code here
        // media: ...  <--- REMOVED this line entirely
      }
    },
  },
  // --- END OF SIMPLIFIED PREVIEW ---
})

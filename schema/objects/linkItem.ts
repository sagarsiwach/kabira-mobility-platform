// schema/objects/linkItem.ts
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons' // Reusing icon

export default defineType({
    name: 'linkItem',
    title: 'Labeled Link',
    type: 'object',
    icon: LinkIcon,
    description: 'A simple navigation item with a display title and a link destination.',
    fields: [
        defineField({
            name: 'title',
            title: 'Display Title',
            type: 'string',
            description: 'The text displayed for this link (e.g., "Test Ride", "About Us").',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link Destination',
            type: 'link', // Use the reusable link object
            validation: Rule => Rule.required().error('A link destination must be configured.'),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            linkType: 'link.linkType',
            linkUrl: 'link.externalUrl', // Example preview details
            linkPath: 'link.path',
        },
        prepare({ title, linkType, linkUrl, linkPath }) {
            let subtitle = `Type: ${linkType || 'Not Set'}`
            if (linkType === 'external') subtitle += ` | URL: ${linkUrl || 'None'}`
            if (linkType === 'path') subtitle += ` | Path: ${linkPath || 'None'}`
            return {
                title: title || 'Untitled Link Item',
                subtitle: subtitle
            }
        }
    }
})